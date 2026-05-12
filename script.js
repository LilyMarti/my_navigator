
    let currentMode = 'pro';
    const counts = { exp: 0, intern: 0, campus: 0, edu: 0 };



function toggleStylePanel() {
    const panel = document.getElementById('style-panel');
    const content = panel.querySelector('.sidebar-content');
    
    panel.classList.toggle('open');
    document.getElementById('overlay').classList.toggle('active');
    
    // 每次打开重置滚动位置
    if(panel.classList.contains('open') && content) {
        con
        
        tent.scrollTop = 0;
    }
    // 点击遮罩层关闭侧边栏
const overlay = document.getElementById('overlay');
if (overlay) {
    overlay.addEventListener('click', function() {
        const panel = document.getElementById('style-panel');
        if (panel.classList.contains('open')) {
            panel.classList.remove('open');
            overlay.classList.remove('active');
        }
    });
}
}
 function selectTemplate(tplName, element) {
    const paper = document.getElementById('resume-content');
    
    // 1. 移除旧模板类
    const allTpls = ['tpl-modern', 'tpl-classic', 'tpl-sideline', 'tpl-navy', 'tpl-gentle','tpl-darkgeek','tpl-cream','tpl-aurora','tpl-popart','tpl-muted','tpl-forest'];
    paper.classList.remove(...allTpls);
    
    // 2. 添加新模板类
    paper.classList.add(tplName);

    // 3. 更新侧边栏选中状态
    document.querySelectorAll('.style-option').forEach(opt => opt.classList.remove('active'));
    element.classList.add('active');

    // 4. 如果在预览页，实时同步缩放
    if (typeof autoFitResume === 'function') autoFitResume();
}

function updateStyle() {
    const color = document.getElementById('themeColor').value;
    document.documentElement.style.setProperty('--primary-color', color);
    document.getElementById('colorValue').innerText = color.toUpperCase();
}

    // 头像处理
    function handleAvatar(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                document.getElementById('outAvatar').src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    // 模式切换
    function switchMode(mode) {
        currentMode = mode;
        document.getElementById('btn-pro').classList.toggle('active', mode === 'pro');
        document.getElementById('btn-stu').classList.toggle('active', mode === 'stu');
        
        document.getElementById('pro-experience').style.display = mode === 'pro' ? 'block' : 'none';
        document.getElementById('stu-experience').style.display = mode === 'stu' ? 'block' : 'none';
        
        document.getElementById('exp-title').innerText = mode === 'pro' ? '工作经历 / Experience' : '实习经历 / Internship';
        document.getElementById('campus-section').style.display = mode === 'stu' ? 'block' : 'none';
        render();
    }

    function addItem(type) {
        const id = ++counts[type];
        const container = document.getElementById(type + 'Inputs');
        const div = document.createElement('div');
        div.className = 'dynamic-item';
        div.id = `${type}-group-${id}`;
        
        const config = {
            exp: ['公司名称', '职位/角色'],
            intern: ['实习机构', '实习岗位'],
            campus: ['活动/项目名称', '担任角色'],
            edu: ['毕业院校', '所学专业']
        };
        const p = config[type];

        div.innerHTML = `
            <button class="btn-del" onclick="this.parentElement.remove();render()">删除</button>
            <div class="form-group"><label>${p[0]}</label><input type="text" class="item-main" oninput="render()"></div>
            <div class="form-group"><label>${p[1]}</label><input type="text" class="item-sub" oninput="render()"></div>
            <div style="display:flex; gap:10px">
                <div style="flex:1"><label>开始日期</label><input type="month" class="item-start" oninput="render()"></div>
                <div style="flex:1"><label>结束日期</label><input type="month" class="item-end" oninput="render()"></div>
            </div>
            ${type !== 'edu' ? `<div class="form-group" style="margin-top:10px"><label>详细描述</label><textarea class="item-desc" rows="3" oninput="render()"></textarea></div>` : 
            `<div class="form-group" style="margin-top:10px"><label>主修课程 (用逗号分隔)</label><textarea class="item-courses" rows="2" oninput="render()"></textarea></div>`}
        `;
        container.appendChild(div);
        render();
    }

    function render() {
    // 1. 姓名部分
const nameVal = document.getElementById('inName').value || "王小明";
    document.getElementById('outName').innerText = nameVal;
    

    // 2. 个人评价
    document.getElementById('outSummary').innerText = document.getElementById('inSummary').value || "请在左侧输入...";
    

    // 3. 提取输入值
    const age = document.getElementById('inAge').value || '25岁';
    const phone = document.getElementById('inPhone').value || '138-0000-0000';
    const email = document.getElementById('inEmail').value || 'example@email.com';
    const edu = document.getElementById('edu').value || '本科';
    const addr = document.getElementById('addr').value || '北京市';

    // 个人技能渲染
    const personalInput = document.getElementById('inPersonal').value; // 假设左侧输入框ID为inPersonal
    const personalOutput = document.getElementById('outPersonal');

    if (!personalInput.trim()) {
        personalOutput.innerText = "请在左侧输入您的个人技能描述...";
        personalOutput.style.color = "#94a3b8"; // 未输入时显示淡灰色
    } else {
        // 使用 innerText 配合 CSS 的 white-space 属性
        // 这样可以完美保留换行，并防止 HTML 脚本注入
        personalOutput.innerText = personalInput;
        personalOutput.style.color = "#475569"; // 正常文本颜色
    }
    

    // 4. 重新布局：使用 class 来控制间距和固定
document.getElementById('header-meta').innerHTML = `
        <div class="info-item"><span class="info-label">年龄：</span>${age}</div>
        <div class="info-item"><span class="info-label">电话：</span>${phone}</div>
        <div class="info-item"><span class="info-label">学历：</span>${edu}</div>
        <div class="info-item"><span class="info-label">地址：</span>${addr}</div>
        <div class="info-item" style="grid-column: span 2;">
            <span class="info-label">邮箱：</span>${email}
        </div>
    `;
        // 渲染经历
        const mainInputId = currentMode === 'pro' ? 'expInputs' : 'internInputs';
        renderList(mainInputId, 'outExp');
        if(currentMode === 'stu') renderList('campusInputs', 'outCampus');

        // 教育渲染（特殊处理课程标签）
        let eduHtml = '';
        document.querySelectorAll('#eduInputs .dynamic-item').forEach(item => {
            const sch = item.querySelector('.item-main').value;
            const maj = item.querySelector('.item-sub').value;
            const s = item.querySelector('.item-start').value;
            const e = item.querySelector('.item-end').value || "至今";
            const courses = item.querySelector('.item-courses').value.split(/[,，]/).map(c => c.trim() ? `<span class="tag" style="background:#eff6ff; border-color:#dbeafe; color:var(--primary-color)">${c}</span>` : '').join('');
            
            eduHtml += `<div style="margin-bottom:15px">
                <div class="item-row">
                    <div><span class="company-name">${sch}</span><span class="job-title">${maj}</span></div>
                    <span class="item-date">${s} - ${e}</span>
                </div>
                <div class="tag-container">${courses}</div>
            </div>`;
        });
        document.getElementById('outEdu').innerHTML = eduHtml;

        // 技能渲染
        const skills = document.getElementById('inSkills').value.split(/[,，]/);
        document.getElementById('outSkills').innerHTML = skills.map(s => s.trim() ? `<span class="tag">${s}</span>` : '').join('');
    }

    function renderList(inputId, outputId) {
        let html = '';
        document.querySelectorAll(`#${inputId} .dynamic-item`).forEach(item => {
            const m = item.querySelector('.item-main').value;
            const s = item.querySelector('.item-sub').value;
            const start = item.querySelector('.item-start').value;
            const end = item.querySelector('.item-end').value || "至今";
            const desc = item.querySelector('.item-desc').value;
            html += `<div style="margin-bottom:15px">
                <div class="item-row">
                    <div><span class="company-name">${m}</span><span class="job-title">${s}</span></div>
                    <span class="item-date">${start} - ${end}</span>
                </div>
                <div class="desc">${desc}</div>
            </div>`;
        });
        document.getElementById(outputId).innerHTML = html;
    }

    function updateStyle() {
        document.documentElement.style.setProperty('--primary-color', document.getElementById('themeColor').value);
    }

function switchView(target) {
    // 1. 获取元素
    const editorView = document.getElementById('editor-view');
    const previewView = document.getElementById('preview-view');
    const navEdit = document.getElementById('nav-edit');
    const navPreview = document.getElementById('nav-preview');

    // 2. 切换逻辑
    if (target === 'edit') {
        editorView.classList.add('active');
        previewView.classList.remove('active');
        navEdit.classList.add('active');
        navPreview.classList.remove('active');
    } else {
        editorView.classList.remove('active');
        previewView.classList.add('active');
        navEdit.classList.remove('active');
        navPreview.classList.add('active');

        // 3. 核心：切换到预览时执行一次渲染和缩放适配
        render(); 
        autoFitResume();
    }
}

// 自动缩放简历以适配不同屏幕宽度
function autoFitResume() {
    const paper = document.querySelector('.resume-paper');
    if (!paper) return;
    
    const containerWidth = document.body.clientWidth - 40; // 留出页边距
    const paperWidth = 794; // A4 标准宽度 px
    
    if (containerWidth < paperWidth) {
        const scale = containerWidth / paperWidth;
        paper.style.transform = `scale(${scale})`;
        paper.style.marginBottom = `-${(1 - scale) * paper.offsetHeight}px`; // 修正缩放后的占位高度
    } else {
        paper.style.transform = 'scale(1)';
        paper.style.marginBottom = '0';
    }
}

// 初始化：默认显示编辑页
window.onload = () => {
    switchView('edit');
};

// 切换样式面板的显示/隐藏
function toggleStylePanel() {
    const panel = document.getElementById('style-panel');
    panel.classList.toggle('open');
}

// 修改原有的 switchView 函数，确保切换页面时关闭面板
function switchView(target) {
    const editorView = document.getElementById('editor-view');
    const previewView = document.getElementById('preview-view');
    const navEdit = document.getElementById('nav-edit');
    const navPreview = document.getElementById('nav-preview');
    const panel = document.getElementById('style-panel');

    // 切换时关闭样式面板
    panel.classList.remove('open');

    if (target === 'edit') {
        editorView.classList.add('active');
        previewView.classList.remove('active');
        navEdit.classList.add('active');
        navPreview.classList.remove('active');
    } else {
        editorView.classList.remove('active');
        previewView.classList.add('active');
        navEdit.classList.remove('active');
        navPreview.classList.add('active');
        render();
        autoFitResume();
    }
}


  function exportPDF() {
        const el = document.getElementById('resume-content');
        html2pdf().set({ margin: 0, filename: 'resume.pdf', html2canvas: { scale: 3 }, jsPDF: { format: 'a4', orientation: 'portrait' } }).from(el).save();
    }

//     // 初始化内容
    addItem('exp'); addItem('edu');
