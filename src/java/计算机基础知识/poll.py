import re
import os
import glob
import hashlib
import requests
import mimetypes  # 新增：用于根据网络响应头判断文件后缀

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

    # 1. 匹配标准 Markdown 格式。放宽限制：匹配括号内所有的非空白字符。不再死板要求后缀。
    pattern_md = r'!\[.*?\]\((https?://[^\s)]+)\)'
    matches_md = re.findall(pattern_md, content)

    # 2. 匹配 HTML img 标签格式。同样放宽限制。
    pattern_html = r'<img.*?src=["\'](https?://[^"\'\s]+)["\']'
    matches_html = re.findall(pattern_html, content)

    # 合并两种匹配结果，并利用 set 去重
    matches = list(set(matches_md + matches_html))

    print(f"Found {len(matches)} unique images in {os.path.basename(md_file_path)}")
    
    for url in matches:
        try:
            # 下载图片
            response = requests.get(url, cookies=cookie_dict)
            response.raise_for_status()

            # 新增逻辑：通过服务器返回的 Content-Type 判断真实的图片格式
            content_type = response.headers.get('Content-Type', '')
            ext = mimetypes.guess_extension(content_type.split(';')[0]) # 获取如 '.png', '.jpg'
            
            if not ext:
                ext = '.png' # 如果服务器没返回具体类型，兜底默认存为 png
            
            # 统一格式处理 (有些库端返回 .jpe，统一改为 .jpg)
            file_extension = ext.lstrip('.')
            if file_extension == 'jpe':
                file_extension = 'jpg'

            # 计算图片的哈希值作为文件名
            file_hash = hashlib.sha256(response.content).hexdigest()
            filename = f'{file_hash}.{file_extension}'
            file_path = os.path.join(save_folder_path, filename)

            # 保存图片到磁盘
            with open(file_path, 'wb') as f:
                f.write(response.content)

            # 替换Markdown文件中的链接 (注意这里加了 ./ 解决 Vite 找不到资源的问题)
            content = content.replace(url, f'./{save_folder}/{filename}')

        except requests.RequestException as e:
            print(f"Failed to download {url}: {e}")

    # 将更新后的内容写回.md文件
    with open(md_file_path, 'w', encoding='utf-8') as file:
        file.write(content)

def convert_cookie_to_dict(cookies):
    result = dict()
    for record in cookies.split('; '):
        if '=' in record:
            key, value = record.split('=', 1) # 增加最大分割次数防止 value 中包含 = 报错
            result[key] = value
    return result

# 此处替换成正常访问图片URL可能需要的cookie字符串
cookie_dict = convert_cookie_to_dict("A=a; B=b; C=c")

script_dir = os.path.dirname(os.path.abspath(__file__))
for md_file in glob.glob(os.path.join(script_dir, '*.md')):
    download_and_replace_image_links(md_file, cookie_dict)