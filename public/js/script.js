// // Example starter JavaScript for disabling form submissions if there are invalid fields
// (() => {
//   "use strict";

//   // Fetch all the forms we want to apply custom Bootstrap validation styles to
//   const forms = document.querySelectorAll(".needs-validation");

//   // Loop over them and prevent submission
//   Array.from(forms).forEach((form) => {
//     form.addEventListener(
//       "submit",
//       (event) => {
//         if (!form.checkValidity()) {
//           event.preventDefault();
//           event.stopPropagation();
//         }

//         form.classList.add("was-validated");
//       },
//       false,
//     );
//   });
// })();

// // for search + near me

// const nearMeCheckbox = document.getElementById("nearMe");
// const latInput = document.getElementById("lat");
// const lngInput = document.getElementById("lng");
// const filterForm = document.querySelector("form[action='/parkingspots']");

// if (nearMeCheckbox) {
//   nearMeCheckbox.addEventListener("change", function () {
//     if (this.checked) {
//       if (!navigator.geolocation) {
//         alert("Geolocation not supported");
//         this.checked = false;
//         return;
//       }

//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           latInput.value = position.coords.latitude;
//           lngInput.value = position.coords.longitude;
//         },
//         () => {
//           alert("Location permission is required for Near Me filter");
//           this.checked = false;
//         },
//       );
//     } else {
//       latInput.value = "";
//       lngInput.value = "";
//     }
//   });
// }

// // Prevent submit if Near Me checked but coords missing
// filterForm.addEventListener("submit", function (e) {
//   if (nearMeCheckbox.checked && (!latInput.value || !lngInput.value)) {
//     e.preventDefault();
//     alert("Please allow location access to use Near Me filter");
//   }
// });

//for filters drawer

document.addEventListener("DOMContentLoaded", () => {
  const openFilterBtn = document.getElementById("openFilterBtn");
  const closeFilterBtn = document.getElementById("closeFilterBtn");
  const filterDrawer = document.getElementById("filterDrawer");
  const filterForm = document.querySelector(".filter-form");

  if (!openFilterBtn || !filterDrawer) {
    console.warn("Filter drawer not present on this page");
    return;
  }

  // Open drawer
  openFilterBtn.addEventListener("click", () => {
    filterDrawer.classList.add("open");
  });

  // Close drawer
  closeFilterBtn?.addEventListener("click", () => {
    filterDrawer.classList.remove("open");
  });

  // Auto close on apply
  filterForm?.addEventListener("submit", () => {
    filterDrawer.classList.remove("open");
  });
});