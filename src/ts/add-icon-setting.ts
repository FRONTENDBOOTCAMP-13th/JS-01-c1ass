import { programIDSet, programID, type program } from '../programID.ts';
import { iconBar } from './icon-bar.ts';
import { insertIcon } from './mac-panel-manager.ts';

function addIconInnerProgram(): HTMLDivElement {
  const inner_program = document.createElement('div');
  inner_program.classList.add('add-icon-inner-program');
  const add_icon_input_container1 = document.createElement('div');
  add_icon_input_container1.classList.add('add-icon-input-container');
  const icon_name_div = document.createElement('div');
  icon_name_div.textContent = '아이콘 이름';
  const icon_name_input = document.createElement('input');
  icon_name_input.type = 'text';
  icon_name_input.id = 'icon-name-input';
  icon_name_input.classList.add('add-icon-input');
  const add_icon_input_container2 = document.createElement('div');
  add_icon_input_container2.classList.add('add-icon-input-container');
  const icon_url_div = document.createElement('div');
  icon_url_div.textContent = '아이콘 URL';
  const icon_url_input = document.createElement('input');
  icon_url_input.type = 'text';
  icon_url_input.id = 'icon-url-input';
  icon_url_input.classList.add('add-icon-input');
  const add_icon_btn_container = document.createElement('div');
  add_icon_btn_container.classList.add('add-icon-btn-container');
  add_icon_btn_container.style.display = 'flex';
  add_icon_btn_container.style.justifyContent = 'end';
  const add_icon_btn = document.createElement('button');
  add_icon_btn.type = 'button';
  add_icon_btn.style.border = '1px solid black';
  add_icon_btn.textContent = '저장';

  inner_program.appendChild(add_icon_input_container1);
  add_icon_input_container1.appendChild(icon_name_div);
  add_icon_input_container1.appendChild(icon_name_input);
  inner_program.appendChild(add_icon_input_container2);
  add_icon_input_container2.appendChild(icon_url_div);
  add_icon_input_container2.appendChild(icon_url_input);
  inner_program.appendChild(add_icon_btn_container);
  add_icon_btn_container.appendChild(add_icon_btn);

  add_icon_btn.addEventListener('click', () => {
    const item: program = {
      pid: (document.getElementById('icon-name-input') as HTMLInputElement)!.value,
      fileURL: (document.getElementById('icon-url-input') as HTMLInputElement)!.value,
    };
    programIDSet.add(item.pid);
    programID.push(item);
    const tmpicon = iconBar.createIcon(0, item.pid);
    insertIcon(tmpicon);
    const addIconIcon = document.querySelector('li.icon[data-id="add-icon"]')!;
    const icon_bar = document.querySelector('#icon-bar');
    icon_bar!.insertBefore(tmpicon, addIconIcon);
    (add_icon_btn.closest('li')?.querySelector('.close-mac-panel') as HTMLElement)!.click();
  });
  return inner_program;
}

export { addIconInnerProgram };
