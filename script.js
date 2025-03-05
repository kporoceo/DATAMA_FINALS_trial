const appointmentForm = document.getElementById("appointmentForm");
const confirmationCard = document.getElementById("confirmationCard");

appointmentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(appointmentForm);
    const queryString = new URLSearchParams(formData).toString();
    
    window.location.href = `confirmation.html?${queryString}`;

    // Collect appointment details
    const appointmentDetails = {
        ownerName: formData.get("ownerName"),
        phoneNumber: formData.get("phoneNumber"),
        emailAddress: formData.get("emailAddress"),
        petName: formData.get("petName"),
        petType: formData.get("petType"),
        royalGrooming: formData.get("royalGrooming"),
        bathBlowDry: formData.get("bathBlowDry"),
        sanitaryCut: formData.get("sanitaryCut"),
        faceTrim: formData.get("faceTrim"),
        dematting: formData.get("dematting"),
        medicatedShampoo: formData.get("medicatedShampoo"),
        haircut: formData.get("haircut"),
        boardingServices: formData.get("boardingServices"),
    };

    // Generate confirmation message
    confirmationCard.innerHTML = `
        <div class="card">
            <h2>Your Appointment Has Been Booked!</h2>
            <p>Thank you, <strong>${appointmentDetails.ownerName}</strong>, for booking an appointment for <strong>${appointmentDetails.petName}</strong> (${appointmentDetails.petType}).</p>
            <p>We will contact you at <strong>${appointmentDetails.phoneNumber}</strong> or <strong>${appointmentDetails.emailAddress}</strong> to confirm the details.</p>
            <h3>Selected Services:</h3>
            <ul>
                <li>Royal Grooming: ${appointmentDetails.royalGrooming || "None"}</li>
                <li>Bath & Blow Dry: ${appointmentDetails.bathBlowDry || "None"}</li>
                <li>Sanitary Cut: ${appointmentDetails.sanitaryCut || "None"}</li>
                <li>Face Trim: ${appointmentDetails.faceTrim || "None"}</li>
                <li>Dematting: ${appointmentDetails.dematting || "None"}</li>
                <li>Medicated Shampoo: ${appointmentDetails.medicatedShampoo || "None"}</li>
                <li>Haircut: ${appointmentDetails.haircut || "None"}</li>
                <li>Boarding Service: ${appointmentDetails.boardingServices || "None"}</li>
            </ul>
        </div>
    `;

    // Show the confirmation card
    confirmationCard.style.display = "block";

    // Clear the form
    appointmentForm.reset();
});
