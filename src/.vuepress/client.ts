import { defineClientConfig, useRouter } from "vuepress/client";

// 暗黑模式切换功能
function setupDarkModeToggle() {
  if (typeof window === 'undefined') return;

  console.log('Setting up dark mode toggle...');
  
  // 检测用户系统偏好
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  // 从本地存储读取用户偏好
  const savedTheme = localStorage.getItem("theme");
  
  // 设置初始主题
  let currentTheme = savedTheme || (prefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", currentTheme);
  console.log('Initial theme set to:', currentTheme);
  
  // 添加全局CSS样式，确保按钮样式优先级最高
  if (!document.getElementById('dark-mode-toggle-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'dark-mode-toggle-styles';
    styleSheet.textContent = `
      /* 全局样式，确保切换按钮完全透明 */
      .dark-mode-toggle {
        background: transparent !important;
        background-color: transparent !important;
        border: none !important;
        outline: none !important;
        box-shadow: none !important;
        backdrop-filter: none !important;
        z-index: 999999 !important;
      }
      
      /* 确保在所有状态下都保持透明 */
      .dark-mode-toggle:hover,
      .dark-mode-toggle:focus,
      .dark-mode-toggle:active {
        background: transparent !important;
        background-color: transparent !important;
        box-shadow: none !important;
        backdrop-filter: none !important;
      }
      
      /* 确保在暗黑模式下也保持透明 */
      [data-theme="dark"] .dark-mode-toggle {
        background: transparent !important;
        background-color: transparent !important;
        box-shadow: none !important;
        backdrop-filter: none !important;
      }
    `;
    document.head.appendChild(styleSheet);
  }
  
  // 初始化按钮时的样式设置
  function createToggleButton() {
    console.log('Creating toggle button...');
    
    // 使用div元素代替button元素，避免默认按钮样式的干扰
    const button = document.createElement("div");
    button.className = "dark-mode-toggle";
    button.innerHTML = currentTheme === "dark" ? "🌙" : "☀️";
    button.title = currentTheme === "dark" ? "切换到浅色模式" : "切换到深色模式";
    button.style.cursor = "pointer";
    
    // 添加样式
    button.style.background = "transparent";
    button.style.backgroundColor = "transparent";
    button.style.border = "none";
    button.style.outline = "none";
    button.style.color = currentTheme === "dark" ? "#333" : "#fff";
    button.style.fontSize = "30px";
    button.style.padding = "12px";
    button.style.borderRadius = "50%";
    button.style.transition = "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
    button.style.display = "inline-flex";
    button.style.alignItems = "center";
    button.style.justifyContent = "center";
    button.style.transformOrigin = "center";
    button.style.boxShadow = "none";
    button.style.backdropFilter = "none";
    button.style.userSelect = "none";
    button.style.pointerEvents = "auto";
    
    // 悬停效果 - 保持透明
    button.addEventListener("mouseenter", () => {
      button.style.backgroundColor = "transparent";
      button.style.background = "transparent";
      button.style.boxShadow = "none";
      button.style.backdropFilter = "none";
    });
    
    button.addEventListener("mouseleave", () => {
      button.style.backgroundColor = "transparent";
      button.style.background = "transparent";
      button.style.boxShadow = "none";
      button.style.backdropFilter = "none";
    });
    
    // 点击事件
    button.addEventListener("click", () => {
      // 保存按钮的关键样式属性
      const buttonPosition = button.style.position;
      const buttonBottom = button.style.bottom;
      const buttonRight = button.style.right;
      const buttonZIndex = button.style.zIndex;
      const buttonVisibility = button.style.visibility;
      const buttonPointerEvents = button.style.pointerEvents;
      
      // 按钮旋转动画 - 优化旋转，使旋转更流畅
      button.style.transition = "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
      button.style.transform = "rotate(180deg) scale(1.1)";
      
      // 添加页面切换动画效果 - 只对透明度和背景色添加过渡，避免影响按钮
      document.body.style.transition = "opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
      document.body.style.opacity = "0.7";
      
      setTimeout(() => {
        // 切换主题
        currentTheme = currentTheme === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", currentTheme);
        button.innerHTML = currentTheme === "dark" ? "🌙" : "☀️";
        button.title = currentTheme === "dark" ? "切换到浅色模式" : "切换到深色模式";
        
        // 更新按钮样式以匹配当前主题，同时保持关键位置属性
        button.style.backgroundColor = "transparent";
        button.style.background = "transparent";
        button.style.color = currentTheme === "dark" ? "#333" : "#fff";
        button.style.boxShadow = "none";
        button.style.backdropFilter = "none";
        button.style.border = "none";
        button.style.outline = "none";
        // 确保按钮位置和可见性不变
        button.style.position = buttonPosition;
        button.style.bottom = buttonBottom;
        button.style.right = buttonRight;
        button.style.zIndex = buttonZIndex;
        button.style.visibility = buttonVisibility;
        button.style.pointerEvents = buttonPointerEvents;
        
        localStorage.setItem("theme", currentTheme);
        console.log('Theme toggled to:', currentTheme);
        
        // 恢复页面状态
        document.body.style.opacity = "1";
        
        // 恢复按钮状态
        setTimeout(() => {
          button.style.transition = "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
          button.style.transform = "rotate(360deg) scale(1)";
        }, 100);
        
        // 清除过渡效果，避免影响其他操作
        setTimeout(() => {
          document.body.style.transition = "";
        }, 500);
      }, 200);
    });
    
    // 直接添加到页面右下角固定位置
    try {
      // 设置固定位置样式
      button.style.position = "fixed";
      button.style.bottom = "30px";
      button.style.right = "30px";
      button.style.backgroundColor = "transparent";
      button.style.background = "transparent";
      // 调整颜色，确保在暗黑模式下月亮图标也清晰显示，没有阴影效果
      button.style.color = currentTheme === "dark" ? "#555" : "#fff";
      button.style.zIndex = "999999";
      button.style.boxShadow = "none";
      button.style.backdropFilter = "none";
      button.style.pointerEvents = "auto";
      button.style.visibility = "visible";
      button.style.border = "none";
      button.style.outline = "none";
      
      // 添加到页面
      document.body.appendChild(button);
      console.log('Button added to fixed position at bottom right');
    } catch (error) {
      console.error('Error adding button:', error);
    }
  }
  
  // 等待页面加载完成
  if (document.readyState === "loading") {
    console.log('Waiting for DOM to load...');
    document.addEventListener("DOMContentLoaded", createToggleButton);
  } else {
    createToggleButton();
  }
}

// 为首页 heroText 添加艺术字效果
function setupHeroTextEffect() {
  if (typeof window === 'undefined') return;

  console.log('Setting up hero text effect...');
  
  // 立即尝试查找元素，不等待DOM完全加载
  let heroTextElement = findHeroTextElement();
  
  if (heroTextElement) {
    // 如果找到了元素，立即应用效果
    applyHeroTextEffect(heroTextElement);
  } else {
    // 如果没找到，等待DOM加载完成后再尝试
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        const element = findHeroTextElement();
        if (element) {
          applyHeroTextEffect(element);
        }
      });
    } else {
      // 如果DOM已经加载完成，使用setTimeout确保元素已经渲染
      setTimeout(() => {
        const element = findHeroTextElement();
        if (element) {
          applyHeroTextEffect(element);
        }
      }, 100);
    }
  }
  
  function findHeroTextElement() {
    // 查找 heroText 元素
    const heroTextSelectors = [
      '.hero-title',
      '.hero-text',
      '.theme-hope-hero__title',
      '.theme-hope-hero-title',
      '.home-hero__title',
      '#hero-title',
      '[class*="hero"][class*="title"]',
      '[class*="title"][class*="hero"]'
    ];
    
    for (const selector of heroTextSelectors) {
      const element = document.querySelector(selector);
      if (element) {
        console.log('Found hero text element using selector:', selector);
        return element;
      }
    }
    return null;
  }
  
  function applyHeroTextEffect(element) {
    console.log('Applying hero text effect...');
    
    // 保存原始文本内容
    const originalText = element.textContent || element.innerText;
    
    // 为元素添加一个唯一的类名，方便后续选择
    element.classList.add('custom-hero-title');
    
    // 应用所有最终样式，并添加 !important 确保优先级
    element.style.textAlign = "center";
    element.style.opacity = "1";
    element.style.visibility = "visible";
    element.style.display = "block";
    element.style.margin = "-20px auto 0 !important";
    element.style.transform = "translateY(-15px) !important";
    element.style.position = "relative !important";
    element.style.transition = "none !important";
    element.style.boxSizing = "border-box";
    element.style.zIndex = "999999 !important";
    element.style.pointerEvents = "auto";
    element.style.userSelect = "none";
    
    // 为每个文字添加独立的发光效果
    if (originalText) {
      // 清空元素内容
      element.innerHTML = '';
      
      // 遍历每个字符
      for (let i = 0; i < originalText.length; i++) {
        const char = originalText[i];
        
        // 创建字符元素
        const charElement = document.createElement('span');
        charElement.textContent = char;
        
        // 设置字符样式
        charElement.style.display = "inline-block";
        charElement.style.fontSize = "2.3rem";
        charElement.style.fontWeight = "bold";
        charElement.style.letterSpacing = "8px";
        charElement.style.textShadow = "0 0 5px rgba(255, 255, 255, 0.8), 0 0 10px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 215, 0, 0.6), 0 0 40px rgba(255, 215, 0, 0.4), 0 0 80px rgba(255, 215, 0, 0.2)";
        charElement.style.background = "linear-gradient(45deg, #fff, #ffd700, #fff)";
        charElement.style.backgroundSize = "200% 200%";
        charElement.style.webkitBackgroundClip = "text";
        charElement.style.webkitTextFillColor = "transparent";
        charElement.style.animation = "glowing 3s ease-in-out infinite alternate";
        charElement.style.animationDelay = `${i * 0.1}s`;
        charElement.style.transition = "all 0.3s ease";
        charElement.style.margin = "0";
        charElement.style.padding = "0";
        
        // 添加到元素中
        element.appendChild(charElement);
      }
    }
    
    // 添加全局CSS样式，确保优先级最高
    if (!document.getElementById('hero-title-fix-styles')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'hero-title-fix-styles';
      styleSheet.textContent = `
        /* 全局样式，确保优先级最高 */
        .custom-hero-title,
        .hero-title,
        .theme-hope-hero__title,
        .home-hero__title {
          margin: -20px auto 0 !important;
          transform: translateY(-15px) !important;
          transition: none !important;
          position: relative !important;
          z-index: 999999 !important;
          text-align: center !important;
          display: block !important;
          opacity: 1 !important;
          visibility: visible !important;
          box-sizing: border-box !important;
          pointer-events: auto !important;
          user-select: none !important;
        }
        
        /* 确保父元素不会影响位置 */
        .custom-hero-title *, .hero-title *, .theme-hope-hero__title *, .home-hero__title * {
          transition: none !important;
        }
        
        /* 确保没有其他样式干扰 */
        :root .custom-hero-title,
        :root .hero-title,
        :root .theme-hope-hero__title,
        :root .home-hero__title {
          margin: -20px auto 0 !important;
          transform: translateY(-15px) !important;
        }
        
        /* 暗黑模式下也保持一致 */
        [data-theme="dark"] .custom-hero-title,
        [data-theme="dark"] .hero-title,
        [data-theme="dark"] .theme-hope-hero__title,
        [data-theme="dark"] .home-hero__title {
          margin: -20px auto 0 !important;
          transform: translateY(-15px) !important;
        }
      `;
      document.head.appendChild(styleSheet);
    }
    
    // 强制重排，确保样式立即生效
    void element.offsetWidth;
    
    console.log('Hero text effect applied successfully!');
  }
  
  // 监听页面加载完成后的事件，确保我们的样式不会被覆盖
  window.addEventListener('load', () => {
    // 查找所有可能的英雄文字元素
    const heroTextSelectors = ['.custom-hero-title', '.hero-title', '.theme-hope-hero__title', '.home-hero__title'];
    heroTextSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        const el = element as HTMLElement;
        el.style.margin = "-20px auto 0 !important";
        el.style.transform = "translateY(-15px) !important";
        el.style.transition = "none !important";
        el.style.position = "relative !important";
        el.style.zIndex = "999999 !important";
      });
    });
  });
  
  // 监听更广泛的DOM变化，确保我们的样式不会被覆盖
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      // 检查是否有英雄文字元素被修改
      const heroTextSelectors = ['.custom-hero-title', '.hero-title', '.theme-hope-hero__title', '.home-hero__title'];
      heroTextSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          const el = element as HTMLElement;
          el.style.margin = "-20px auto 0 !important";
          el.style.transform = "translateY(-15px) !important";
          el.style.transition = "none !important";
          el.style.position = "relative !important";
          el.style.zIndex = "999999 !important";
        });
      });
    });
  });
  
  // 观察整个文档的变化，不仅仅是特定元素
  observer.observe(document.body, {
    attributes: true,
    childList: true,
    subtree: true,
    characterData: true
  });
  
  // 每隔500毫秒检查一次样式，确保不会被覆盖
  setInterval(() => {
    const heroTextSelectors = ['.custom-hero-title', '.hero-title', '.theme-hope-hero__title', '.home-hero__title'];
    heroTextSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        const el = element as HTMLElement;
        el.style.margin = "-20px auto 0 !important";
        el.style.transform = "translateY(-15px) !important";
        el.style.transition = "none !important";
        el.style.position = "relative !important";
        el.style.zIndex = "999999 !important";
      });
    });
  }, 500);
  
  // 监听滚动事件，确保位置稳定
  window.addEventListener('scroll', () => {
    const heroTextSelectors = ['.custom-hero-title', '.hero-title', '.theme-hope-hero__title', '.home-hero__title'];
    heroTextSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        const el = element as HTMLElement;
        el.style.margin = "-20px auto 0 !important";
        el.style.transform = "translateY(-15px) !important";
        el.style.transition = "none !important";
      });
    });
  });
}

export default defineClientConfig({
  setup() {
    // 确保只在浏览器环境中执行
    if (typeof window === 'undefined') return;

    console.log('Client setup function called');
    setupDarkModeToggle();
    setupHeroTextEffect();

    // 监听路由变化，确保返回首页时重新应用英雄文字效果
    const router = useRouter();
    router.afterEach((to) => {
      console.log('Route changed to:', to.path);
      // 当路由切换到首页时，重新应用英雄文字效果
      if (to.path === '/' || to.path === '/index.html') {
        console.log('Navigating to homepage, reapplying hero text effect...');
        // 延迟一点时间确保DOM已经更新
        setTimeout(() => {
          setupHeroTextEffect();
        }, 100);
      }
    });
  },
});