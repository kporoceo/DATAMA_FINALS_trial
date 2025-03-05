const appointmentForm = document.getElementById("appointmentForm");

appointmentForm.addEventListener("submit", function (e) {
    e.preventDefault();
    appointmentForm.submit();
    appointmentForm.reset();
});