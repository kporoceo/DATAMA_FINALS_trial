// Get query parameters
const params = new URLSearchParams(window.location.search);
const confirmationDetails = document.getElementById("confirmationDetails");

// Display confirmation details
confirmationDetails.innerHTML = `
    <p>Thank you, <strong>${params.get("owner_name")}</strong>, for booking an appointment for 
    <strong>${params.get("pet_name")}</strong> (${params.get("pet_type")}).</p>
    
    <p>We will contact you at <strong>${params.get("phone_number")}</strong> or 
    <strong>${params.get("email")}</strong> to confirm.</p>

    <h3>Selected Services:</h3>
    <ul>
        ${params.get("royal_grooming") === "Yes" ? "<li>Royal Grooming</li>" : ""}
        ${params.get("bath_blow_dry") === "Yes" ? "<li>Bath & Blow Dry</li>" : ""}
        ${params.get("sanitary_cut") === "Yes" ? "<li>Sanitary Cut</li>" : ""}
        ${params.get("face_trim") === "Yes" ? "<li>Face Trim</li>" : ""}
        ${params.get("boarding_services") === "Yes" ? "<li>Boarding Services</li>" : ""}
    </ul>
`;
