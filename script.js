
    let currentMode = 'pro';
    const counts = { exp: 0, intern: 0, campus: 0, edu: 0 };

    // 风格切换
    // function changeTemplate() {
    //     const val = document.getElementById('tplSelect').value;
    //     const paper = document.getElementById('resume-content');
    //     paper.classList.remove('tpl-modern', 'tpl-classic', 'tpl-sideline');
    //     paper.classList.add(val);
    // }
    function changeTemplate() {
   const val = document.getElementById('tplSelect').value;
    const paper = document.getElementById('resume-content');
    
    // 移除所有旧风格
    paper.classList.remove('tpl-modern', 'tpl-classic', 'tpl-sideline', 'tpl-creative', 'tpl-navy', 'tpl-gentle');
    
    // 添加新风格
    paper.classList.add(val);
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

    function exportPDF() {
        const el = document.getElementById('resume-content');
        html2pdf().set({ margin: 0, filename: 'resume.pdf', html2canvas: { scale: 3 }, jsPDF: { format: 'a4', orientation: 'portrait' } }).from(el).save();
    }

    // 初始化内容
    addItem('exp'); addItem('edu');
