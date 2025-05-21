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
];

const container = document.getElementById('thumbnail-container')!;
const preview = document.getElementById('preview')!;
const nameEl = document.getElementById('name')!;
const screen = document.getElementById('mac-screen')!;
const fileInput = document.getElementById('file-input') as HTMLInputElement;
const uploadBtn = document.getElementById('upload-btn')!;
const applyBtn = document.getElementById('apply-btn')!;

let selectedUrl = bgSelectorImages[0].url;

// 썸네일 생성
bgSelectorImages.forEach(({ name, url }) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'thumbnail-wrapper cursor-pointer overflow-hidden';

  const img = document.createElement('img');
  img.src = url;
  img.alt = name;
  img.dataset.name = name;
  img.className = 'w-full h-full object-cover hover:scale-120 transition-transform duration-300';

  wrapper.addEventListener('click', () => {
    selectedUrl = url;
    preview.style.backgroundImage = `url(${url})`;
    preview.style.backgroundSize = 'cover';
    nameEl.textContent = name;
  });

  wrapper.appendChild(img);
  container.appendChild(wrapper);
});

// 내 파일 버튼
uploadBtn.addEventListener('click', () => {
  fileInput.click();
});

// 파일 선택 시 미리보기
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

// 배경 적용 버튼
applyBtn.addEventListener('click', () => {
  screen.style.backgroundImage = `url(${selectedUrl})`;
});
