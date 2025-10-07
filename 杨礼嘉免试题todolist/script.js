// 页面加载完成后执行初始化
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');
    const clearBtn = document.getElementById('clearBtn');

    // 从localStorage加载任务（无数据则初始化空数组）
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // 渲染任务列表到页面
    function renderTasks() {
        taskList.innerHTML = ''; // 清空现有列表
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <input type="checkbox" ${task.done ? 'checked' : ''} onchange="toggleTask(${index})">
                <span ${task.done ? 'style="text-decoration: line-through;"' : ''}>${task.title}</span>
                <button onclick="deleteTask(${index})">删除</button>
            `;
            taskList.appendChild(li);
        });
    }

    // 添加新任务
    addBtn.addEventListener('click', function() {
        const title = taskInput.value;
        if (title) {
            tasks.push({ title, done: false }); // 添加任务到数组
            saveTasks(); // 保存到localStorage
            renderTasks(); // 调用该函数，让任务显示在任务列表里
            taskInput.value = ''; // 清空输入框
        }
    });

    // 切换任务完成状态（全局函数，供HTML调用）
    window.toggleTask = function(index) {
        tasks[index].done = !tasks[index].done;
        saveTasks();
        renderTasks();
    }

    // 删除任务（全局函数，供HTML调用）
    window.deleteTask = function(index) {
        tasks.splice(index, 1); // 从数组中删除
        saveTasks();
        renderTasks();
    }

    // 清空所有任务
    clearBtn.addEventListener('click', function() {
        tasks = [];
        saveTasks();
        renderTasks();
        alert('真的确定要全部清空吗QAQ')
    });

    // 保存任务到localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // 初始化渲染任务
    renderTasks();
});