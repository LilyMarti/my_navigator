

let counts = { exp: 0, intern: 0, campus: 0, edu: 0 }; 
let currentMode = 'pro';

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
    
    // 1. 切换编辑区的显隐
    document.getElementById('pro-experience').style.display = mode === 'pro' ? 'block' : 'none';
    document.getElementById('stu-experience').style.display = mode === 'stu' ? 'block' : 'none';
    
    // 2. 切换按钮高亮样式
    document.getElementById('btn-pro').classList.toggle('active', mode === 'pro');
    document.getElementById('btn-stu').classList.toggle('active', mode === 'stu');
    
    // 3. 立即触发渲染，更新预览区
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

    function renderEducation() {
    const container = document.getElementById('eduInputs');
    const output = document.getElementById('outEdu');
    if (!container || !output) return;

    let html = '';
    container.querySelectorAll('.dynamic-item').forEach(item => {
        const school = item.querySelector('.item-main').value;
        const major = item.querySelector('.item-sub').value;
        const start = item.querySelector('.item-start').value;
        const end = item.querySelector('.item-end').value || "至今";
        const coursesVal = item.querySelector('.item-courses') ? item.querySelector('.item-courses').value : '';

        // 处理课程标签
        const courseTags = coursesVal.split(/[,，]/)
            .map(c => c.trim() ? `<span class="tag" style="background:#eff6ff; border-color:#dbeafe; padding: 2px 8px; margin: 2px; border-radius: 4px; font-size: 0.85em;">${c}</span>` : '')
            .join('');

        if (school || major) {
            html += `
                <div style="margin-bottom: 15px;">
                    <!-- 第一行：左(学校) - 中(专业) - 右(日期) -->
                    <div class="item-row" style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 5px;">
                        
                        <!-- 左侧：学校名称 (加粗) -->
                        <span style="font-weight: bold; flex: 0 0 auto; font-size: 1.1em;">${school}</span>
                        
                        <!-- 中间：专业 (居中, 斜体, 稍小) -->
                        <span style="flex: 1; text-align: center; font-style: italic; font-size: 0.95em; padding: 0 10px;">${major}</span>
                        
                        <!-- 右侧：日期 -->
                        <span class="item-date" style="flex: 0 0 auto; font-size: 0.9em; color: #666;">${start} — ${end}</span>
                    </div>

                    <!-- 第二行：课程内容 -->
                    <div style="margin-top: 8px;">
                        <label style="font-size: 0.9em; font-weight: bold; color: #444;">主修课程：</label>
                        <div class="tag-container" style="display: inline-flex; flex-wrap: wrap; gap: 4px; vertical-align: middle;">
                            ${courseTags || '<span style="color: #94a3b8; font-size: 0.85em;">暂未填写</span>'}
                        </div>
                    </div>
                </div>
            `;
        }
    });
    output.innerHTML = html;
}

    function render() {
    // --- 1. 基本信息同步 ---
    const nameVal = document.getElementById('inName').value || "姓名";
    document.getElementById('outName').innerText = nameVal;
    
    const age = document.getElementById('inAge').value || '年龄';
    const phone = document.getElementById('inPhone').value || '联系电话';
    const email = document.getElementById('inEmail').value || '电子邮箱';
    const eduLevel = document.getElementById('edu').value || '学历'; // 基本信息里的学历
    const addr = document.getElementById('addr').value || '居住地址';

    // 更新联系方式栏 (Header Meta)
    const headerMeta = document.getElementById('header-meta');
    if (headerMeta) {
        headerMeta.innerHTML = `
            <div class="info-item"><span class="info-label">年龄：</span>${age}</div>
            <div class="info-item"><span class="info-label">电话：</span>${phone}</div>
            <div class="info-item"><span class="info-label">学历：</span>${eduLevel}</div>
            <div class="info-item"><span class="info-label">地址：</span>${addr}</div>
            <div class="info-item" style="grid-column: span 2;">
                <span class="info-label">邮箱：</span>${email}
            </div>
        `;
    }

    // --- 2. 个人总结与技能描述 ---
    const summary = document.getElementById('inSummary').value;
    document.getElementById('outSummary').innerText = summary || "请填写个人评价...";

    const personalInput = document.getElementById('inPersonal').value;
    const personalOutput = document.getElementById('outPersonal');
    if (personalOutput) {
        personalOutput.innerText = personalInput || "请填写专业技能描述...";
        personalOutput.style.color = personalInput ? "#475569" : "#94a3b8";
    }

    // --- 3. 技能标签渲染 (用逗号分隔) ---
    const skillsVal = document.getElementById('inSkills').value;
    const outSkills = document.getElementById('outSkills');
    if (outSkills) {
        const skillsArray = skillsVal.split(/[,，]/);
        outSkills.innerHTML = skillsArray
            .map(s => s.trim() ? `<span class="tag">${s.trim()}</span>` : '')
            .join('');
    }

    // --- 4. 经历部分渲染 (核心逻辑) ---
    
    // 同步标题：工作经历 vs 实习经历
   const expTitlePreview = document.querySelector('#outExpSection .section-title');
    if (expTitlePreview) {
        expTitlePreview.innerText = currentMode === 'pro' ? '工作经历 / Experience' : '实习经历 / Internship';
    }
    // 渲染主经历区
   const mainInputId = currentMode === 'pro' ? 'expInputs' : 'internInputs';
    renderList(mainInputId, 'outExp');

    // 渲染校园经历 (仅在学生模式显示)
    const outCampusSec = document.getElementById('outCampusSection');
    if (outCampusSec) {
        if (currentMode === 'stu') {
            outCampusSec.style.display = 'block';
            renderList('campusInputs', 'outCampus');
        } else {
            outCampusSec.style.display = 'none';
        }
    }

    // --- 5. 教育背景渲染 (特殊处理课程标签) ---
    renderEducation();
}

   /**
 * 通用渲染函数：处理工作、实习、校园经历
 * @param {string} inputContainerId 左侧输入框容器ID
 * @param {string} outputContainerId 右侧预览显示容器ID
 */
function renderList(inputContainerId, outputContainerId) {
    const container = document.getElementById(inputContainerId);
    const output = document.getElementById(outputContainerId);
    if (!container || !output) return;

    let html = '';
    const items = container.querySelectorAll('.dynamic-item');

    items.forEach(item => {
    const main = item.querySelector('.item-main').value;   // 公司或机构名称
    const sub = item.querySelector('.item-sub').value;     // 职位或角色
    const start = item.querySelector('.item-start').value; // 开始日期
    const end = item.querySelector('.item-end').value || "至今";
    const desc = item.querySelector('.item-desc') ? item.querySelector('.item-desc').value : '';

    if (main || sub) {
        html += `
            <div class="info-block" style="margin-bottom: 15px;">
                <!-- 第一行：左(公司) - 中(职位) - 右(日期) -->
                <div class="item-row" style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 5px;">
                    <!-- 左侧：公司名称 (加粗, 1.1em) -->
                    <span style="font-size: 1.1em; font-weight: bold; flex: 0 0 auto;">${main}</span>
                    
                    <!-- 中间：职位 (不加粗, 斜体, 小一号, 居中对齐) -->
                    <span style="font-size: 0.95em; font-weight: normal; font-style: italic; flex: 1; text-align: center; padding: 0 10px;">${sub}</span>
                    
                    <!-- 右侧：日期 (灰色, 0.9em) -->
                    <span class="item-date" style="font-size: 0.9em; color: #666; flex: 0 0 auto;">${start} — ${end}</span>
                </div>
                
                <!-- 第二行：详细描述 -->
                <div style="white-space: pre-line; font-size: 0.95em; color: #333; line-height: 1.5;">${desc}</div>
            </div>
        `;
    }
    });

    output.innerHTML = html || `<p style="color: #94a3b8; font-size: 0.9em;">点击左侧“+添加”完善此部分内容</p>`;
}
    function updateStyle() {
        document.documentElement.style.setProperty('--primary-color', document.getElementById('themeColor').value);
    }
    function switchView(target) {
    const editorView = document.getElementById('editor-view');
    const previewView = document.getElementById('preview-view');
    const navEdit = document.getElementById('nav-edit');
    const navPreview = document.getElementById('nav-preview');

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

        // 核心优化：
        // 1. 先执行数据渲染
        render(); 
        
        // 2. 确保在下一帧执行缩放，避免获取不到正确的 offsetWidth
        requestAnimationFrame(() => {
            autoFitResume();
        });
        
        // 3. 针对某些老款安卓机型，加一层双保险延迟
        setTimeout(autoFitResume, 100);
    }
}
// 自动缩放简历以适配不同屏幕宽度
function autoFitResume() {
    const resume = document.getElementById('resume-content');
    const container = document.getElementById('preview-view'); // 预览视图的包裹层

    if (!resume || !container) return;

    // 1. 重置缩放，获取简历原始尺寸
    resume.style.transform = 'scale(1)';
    const resumeWidth = 794; // A4 标准像素宽 (210mm)
    const screenWidth = window.innerWidth;

    // 2. 计算缩放比（左右各留 10px 边距）
    if (screenWidth < resumeWidth) {
        const padding = 20; 
        const scale = (screenWidth - padding) / resumeWidth;

        // 3. 应用缩放
        // transform-origin 必须在 CSS 里设为 top center
        resume.style.transform = `scale(${scale})`;

        // 4. 高度修正：Scale 缩放不会改变元素占用的原始物理高度
        // 我们需要手动调整容器高度，否则底部会出现巨大空白
        const scaledHeight = resume.offsetHeight * scale;
        container.style.height = (scaledHeight + 40) + 'px'; 
    } else {
        // PC 端恢复
        resume.style.transform = 'scale(1)';
        container.style.height = 'auto';
    }
}
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
window.addEventListener('resize', () => {
    if (document.getElementById('preview-view').classList.contains('active')) {
        autoFitResume();
    }
});

//   function exportPDF() {
//         const el = document.getElementById('resume-content');
//         html2pdf().set({ margin: 0, filename: 'resume.pdf', html2canvas: { scale: 3 }, jsPDF: { format: 'a4', orientation: 'portrait' } }).from(el).save();
//     }

function exportPDF() {
    const sourceEl = document.getElementById('resume-content');
    
    // 1. 克隆一个简历副本，避免污染原页面 UI
    const cloneEl = sourceEl.cloneNode(true);
    
    // 2. 强制给副本应用 A4 标准样式，消除手机端 CSS 响应式的影响
    Object.assign(cloneEl.style, {
        width: '210mm',
        height: 'auto',
        position: 'absolute',
        top: '-9999px', // 移出可视区
        left: '0',
        transform: 'none', // 移除所有缩放
        margin: '0',
        padding: '20mm', // 强制页边距
        backgroundColor: '#ffffff'
    });
    
    document.body.appendChild(cloneEl);

    // 3. 配置参数
    const opt = {
        margin: 0,
        filename: '我的简历.pdf',
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { 
            scale: 2, 
            useCORS: true,
            windowWidth: 794, // 210mm 在 96DPI 下约等于 794px
            scrollY: 0,
            scrollX: 0
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    // 4. 执行导出并销毁副本
    html2pdf().set(opt).from(cloneEl).save().then(() => {
        document.body.removeChild(cloneEl);
    });
}
//     // 初始化内容
    addItem('exp'); addItem('edu');
