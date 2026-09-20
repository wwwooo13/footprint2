const taskList = document.querySelector('#taskList');
const completeCount = document.querySelector('#completeCount');
const totalCount = document.querySelector('#totalCount');
const progressFill = document.querySelector('#progressFill');
const progressText = document.querySelector('#progressText');
const taskDialog = document.querySelector('#taskDialog');

function updateProgress() {
  const tasks = [...taskList.querySelectorAll('.task')];
  const completed = tasks.filter((task) => task.querySelector('input').checked).length;
  const percentage = Math.round((completed / tasks.length) * 100);
  completeCount.textContent = completed;
  totalCount.textContent = tasks.length;
  progressFill.style.width = `${percentage}%`;
  progressText.textContent = `${percentage}%`;
}

taskList.addEventListener('change', (event) => {
  const task = event.target.closest('.task');
  task.classList.toggle('completed', event.target.checked);
  updateProgress();
});

document.querySelector('#addTask').addEventListener('click', () => taskDialog.showModal());
taskDialog.addEventListener('close', () => {
  const taskName = document.querySelector('#taskName');
  if (taskDialog.returnValue !== 'default' || !taskName.value.trim()) return;
  const task = document.createElement('label');
  task.className = 'task';
  task.innerHTML = `<input type="checkbox" /><span class="check"></span><span class="task-copy"><b>${taskName.value.trim()}</b><small>个人事项</small></span><span class="tag green">生活</span><time>今天</time>`;
  taskList.append(task);
  taskName.value = '';
  updateProgress();
});

document.querySelector('#saveNote').addEventListener('click', () => {
  const button = document.querySelector('#saveNote');
  button.textContent = '已保存';
  setTimeout(() => { button.textContent = '保存'; }, 1400);
});

document.querySelector('#showAll').addEventListener('click', () => {
  document.querySelector('#todo').scrollIntoView({ behavior: 'smooth' });
});
