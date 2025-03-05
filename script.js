const appointmentForm = document.getElementById("appointmentForm");

appointmentForm.addEventListener("submit", function () {
    setTimeout(() => appointmentForm.reset(), 1000); // Reset form after submission
});
