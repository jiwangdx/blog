import re
import os
import glob
import hashlib
import requests

def download_and_replace_image_links(md_file_path, cookie_dict, save_folder='images'):
    # 获取脚本所在目录的绝对路径
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # 如果传入的是相对路径，转换为绝对路径
    if not os.path.isabs(md_file_path):
        md_file_path = os.path.join(script_dir, md_file_path)
    
    # 确保保存图片的文件夹存在
    save_folder_path = os.path.join(script_dir, save_folder)
    if not os.path.exists(save_folder_path):
        os.makedirs(save_folder_path)

    # 读取.md文件
    with open(md_file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    # 正则表达式匹配Markdown中的图片链接（支持多种格式，包括svg，查询参数可选）
    pattern = r'!\[.*?\]\((https?://.*?\.(awebp|webp|jpg|png|gif|svg)\??.*?)\)'
    matches = re.findall(pattern, content)

    # 下载并保存图片，更新Markdown文件内容
    print(cookie_dict)
    for match in matches:
        url, file_extension = match
        try:
            response = requests.get(url, cookies=cookie_dict)
            response.raise_for_status()  # 确保请求成功

            # 计算图片的哈希值作为文件名
            file_hash = hashlib.sha256(response.content).hexdigest()
            filename = f'{file_hash}.{file_extension}'
            file_path = os.path.join(save_folder_path, filename)

            # 保存图片到磁盘
            with open(file_path, 'wb') as f:
                f.write(response.content)

            # 替换Markdown文件中的链接
            content = content.replace(url, f'{save_folder}/{filename}')

        except requests.RequestException as e:
            print(f"Failed to download {url}: {e}")

    # 将更新后的内容写回.md文件
    with open(md_file_path, 'w', encoding='utf-8') as file:
        file.write(content)

def convert_cookie_to_dict(cookies):
    result = dict()
    for record in cookies.split('; '):
        key, value = record.split('=')
        result[key] = value
    return result

# 此处替换成正常访问图片URL可能需要的cookie字符串
cookie_dict = convert_cookie_to_dict("A=a; B=b; C=c");

script_dir = os.path.dirname(os.path.abspath(__file__))
for md_file in glob.glob(os.path.join(script_dir, '*.md')):
    download_and_replace_image_links(md_file, cookie_dict)
