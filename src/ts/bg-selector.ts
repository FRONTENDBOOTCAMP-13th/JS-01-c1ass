export function createBgSelectorUI(panelProgram: HTMLElement) {
  const bgSelectorImagesPath: string = '/asserts/bg-selector-img';

  const bgSelectorImages = [
    { name: 'sunset', url: `${bgSelectorImagesPath}/sunset.webp` },
    { name: 'mountain', url: `${bgSelectorImagesPath}/mountain.webp` },
    { name: 'butterfly', url: `${bgSelectorImagesPath}/butterfly.webp` },
    { name: 'cloud', url: `${bgSelectorImagesPath}/cloud.webp` },
    { name: 'couple', url: `${bgSelectorImagesPath}/couple.webp` },
    { name: 'flower', url: `${bgSelectorImagesPath}/flower.webp` },
    { name: 'park', url: `${bgSelectorImagesPath}/park.webp` },
    { name: 'pond', url: `${bgSelectorImagesPath}/pond.webp` },
    { name: 'sea', url: `${bgSelectorImagesPath}/sea.webp` },
    { name: 'weat', url: `${bgSelectorImagesPath}/weat.webp` },
    { name: 'base-light', url: `${bgSelectorImagesPath}/mac-screen-base-background-img.png` },
    { name: 'base-dark', url: `${bgSelectorImagesPath}/mac-screen-base-dark-background-img.png` },
  ];

  const wrapper = document.createElement('div');
  wrapper.className = 'p-5 flex flex-col gap-4';

  // Preview 영역
  const previewWrapper = document.createElement('div');
  previewWrapper.className = 'flex gap-4';

  const preview = document.createElement('div');
  preview.id = 'preview';
  preview.className = 'w-[7rem] h-[5rem] lg:w-[15rem] lg:h-[10rem] border-2 border-blue-500 bg-center bg-cover rounded-lg';
  preview.style.backgroundImage = `url(${bgSelectorImages[0].url})`;

  const previewTextBox = document.createElement('div');

  const title = document.createElement('span');
  title.className = 'text-2xl font-semibold';
  title.textContent = '선택된 이미지';

  const nameEl = document.createElement('p');
  nameEl.id = 'name';
  nameEl.className = 'text-lg';
  nameEl.textContent = bgSelectorImages[0].name;

  previewTextBox.appendChild(title);
  previewTextBox.appendChild(nameEl);
  previewWrapper.appendChild(preview);
  previewWrapper.appendChild(previewTextBox);
  wrapper.appendChild(previewWrapper);

  // 버튼 영역
  const buttonWrapper = document.createElement('div');
  buttonWrapper.className = 'flex gap-2 justify-between';

  const fileInput = document.createElement('input');
  fileInput.id = 'file-input';
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.className = 'hidden';

  const uploadBtn = document.createElement('button');
  uploadBtn.id = 'upload-btn';
  uploadBtn.textContent = '내 파일';
  uploadBtn.className = 'px-4 py-3 bg-blue-500 text-white hover:bg-blue-600 rounded-lg duration-300 cursor-pointer';

  const applyBtn = document.createElement('button');
  applyBtn.id = 'apply-btn';
  applyBtn.textContent = '배경 변경하기';
  applyBtn.className = 'px-4 py-3 bg-blue-500 text-white hover:bg-blue-600 rounded-lg duration-300 cursor-pointer';

  buttonWrapper.appendChild(fileInput);
  buttonWrapper.appendChild(applyBtn);
  buttonWrapper.appendChild(uploadBtn);
  wrapper.appendChild(buttonWrapper);

  // 썸네일 목록
  const thumbnailContainer = document.createElement('div');
  thumbnailContainer.id = 'thumbnail-container';
  thumbnailContainer.className = 'grid grid-cols-5 gap-3 m-auto max-h-[20rem] overflow-y-auto';
  wrapper.appendChild(thumbnailContainer);

  panelProgram.appendChild(wrapper);

  // 썸네일 로직
  let selectedUrl: string = bgSelectorImages[0].url;

  bgSelectorImages.forEach(({ name, url }) => {
    const thumbWrapper = document.createElement('div');
    thumbWrapper.className = 'thumbnail-wrapper cursor-pointer overflow-hidden w-full h-[5rem] rounded-md';

    const img = document.createElement('img');
    img.src = url;
    img.alt = name;
    img.dataset.name = name;
    img.className = 'w-full h-full object-cover hover:scale-120 transition-transform duration-300';

    thumbWrapper.addEventListener('click', () => {
      selectedUrl = url;
      preview.style.backgroundImage = `url(${url})`;
      preview.style.backgroundSize = 'cover';
      nameEl.textContent = name;
    });

    thumbWrapper.appendChild(img);
    thumbnailContainer.appendChild(thumbWrapper);
  });

  uploadBtn.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', e => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          selectedUrl = reader.result;
          preview.style.backgroundImage = `url(${reader.result})`;
          preview.style.backgroundSize = 'cover';
          nameEl.textContent = '내 파일';
        }
      };
      reader.readAsDataURL(file);
    }
  });

  applyBtn.addEventListener('click', () => {
    const screen = document.querySelector('.mac-screen') as HTMLElement | null;
    if (screen) {
      screen.style.backgroundImage = `url(${selectedUrl})`;
    }
  });
}
