document.addEventListener("DOMContentLoaded", function () {
  const initialCards = [
    {
      name: "Golden Gate Bridge",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
    },
    {
      name: "Val Thorens",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
    },
    {
      name: "Restaurant terrace",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
    },
    {
      name: "An outdoor cafe",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
    },
    {
      name: "A very long bridge, over the forest and through the trees",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
    },
    {
      name: "Tunnel with morning light",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
    },
    {
      name: "Mountain house",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
    },
  ];

  const previewModal = document.querySelector("#preview-modal");
  const previewCaptionEl = previewModal.querySelector(".modal__caption");
  const previewImageEl = previewModal.querySelector(".modal__image");
  const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
  const editProfileBtn = document.querySelector(".profile__edit-btn");
  const editProfileModal = document.querySelector("#edit-profile-modal");
  const editProfileCloseBtn =
    editProfileModal.querySelector(".modal__close-btn");
  const editProfileForm = editProfileModal.querySelector(".modal__form");
  const profileNameInput = editProfileForm.querySelector("#profile-name-input");
  const profileDescriptionInput = editProfileForm.querySelector(
    "#profile-description-input"
  );

  const cardTemplate = document
    .querySelector("#post-template")
    .content.querySelector(".post");
  const postsGrid = document.querySelector(".posts__grid");

  console.log("postsGrid:", postsGrid);
  console.log("cardTemplate:", cardTemplate);
  console.log("previewModal:", previewModal);

  function getCardElement(data) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardTitleEl = cardElement.querySelector(".post__title");
    const cardImageEl = cardElement.querySelector(".post__image");
    const cardLikeBtnEl = cardElement.querySelector(".post__like-btn");
    const cardDeleteBtnEl = cardElement.querySelector(".post__delete-btn");

    cardLikeBtnEl.addEventListener("click", () => {
      cardLikeBtnEl.classList.toggle("post__like-btn_active");
    });

    cardDeleteBtnEl.addEventListener("click", () => {
      cardElement.remove();
    });

    cardImageEl.addEventListener("click", () => {
      previewImageEl.src = data.link;
      previewImageEl.alt = data.name;
      previewCaptionEl.textContent = data.name;
      openModal(previewModal);
    });

    cardTitleEl.textContent = data.name;
    cardImageEl.src = data.link;
    cardImageEl.alt = data.name;

    return cardElement;
  }

  const profileNameEl = document.querySelector(".profile__name");
  const profileDescriptionEl = document.querySelector(".profile__description");

  function openModal(modal) {
    modal.classList.add("modal_is-opened");
  }

  function closeModal(modal) {
    modal.classList.remove("modal_is-opened");
  }

  editProfileBtn.addEventListener("click", () => {
    profileNameInput.value = profileNameEl.textContent;
    profileDescriptionInput.value = profileDescriptionEl.textContent;
    openModal(editProfileModal);
  });

  editProfileCloseBtn.addEventListener("click", () => {
    closeModal(editProfileModal);
  });

  function handleEditProfileSubmit(evt) {
    evt.preventDefault();
    profileNameEl.textContent = profileNameInput.value.trim();
    profileDescriptionEl.textContent = profileDescriptionInput.value.trim();
    closeModal(editProfileModal);
    editProfileForm.reset();
    editProfileBtn.focus();
  }
  editProfileForm.addEventListener("submit", handleEditProfileSubmit);

  // -----------------------------
  // New Post modal elements
  // -----------------------------

  const newPostBtn = document.querySelector(".profile__add-btn");
  const newPostModal = document.querySelector("#new-post-modal");
  const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
  const newPostForm = newPostModal.querySelector(".modal__form");
  const postImageInput = newPostForm.querySelector("#post-image-input");
  const postCaptionInput = newPostForm.querySelector("#post-caption-input");

  newPostCloseBtn.addEventListener("click", () => {
    closeModal(newPostModal);
  });

  newPostBtn.addEventListener("click", () => {
    openModal(newPostModal);
  });

  previewModalCloseBtn.addEventListener("click", () => {
    closeModal(previewModal);
  });

  function handleNewPostSubmit(evt) {
    evt.preventDefault();

    const inputValues = {
      name: postCaptionInput.value,
      link: postImageInput.value,
    };

    const imageUrl = postImageInput.value.trim();
    const caption = postCaptionInput.value.trim();

    console.log("New post image URL:", imageUrl);
    console.log("New post caption:", caption);

    const cardElement = getCardElement({
      name: postCaptionInput.value,
      link: postImageInput.value,
    });
    postsGrid.prepend(cardElement);

    closeModal(newPostModal);
    newPostForm.reset();
    newPostBtn.focus();
  }

  newPostForm.addEventListener("submit", handleNewPostSubmit);

  initialCards.forEach(function (item) {
    const cardElement = getCardElement(item);
    postsGrid.append(cardElement);
  });
});
