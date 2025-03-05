const appointmentForm = document.getElementById("appointmentForm");
const confirmationCard = document.getElementById("confirmationCard");

//Supabase initialization
const supabaseUrl = 'https://snfhnftwtelgsupzdiyy.supabase.co';
const supabaseAnonKey = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuZmhuZnR3dGVsZ3N1cHpkaXl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2NDEyOTcsImV4cCI6MjA1NjIxNzI5N30.oeO5sBmZx3Fk_VOrhp4w60-uax9_40oik55AYTZ6rIU;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

    // Insert data into Supabase
    const { error } = await supabase
        .from('appointments') // Replace 'appointments' with your table name
        .insert([appointmentDetails]);

    if (error) {
        console.error('Error inserting data:', error);
        alert("There was an error submitting your appointment. Please try again.");
        return;
    } else {
        console.log('Data inserted successfully!');
    }

     //Displaying appointments
     async function displayAppointments() {
        const sessionId = localStorage.getItem('session_id');
        if (!sessionId) {
          console.error('Session ID not found.');
          return;
        }
      
        const { data, error } = await supabase
          .from('appointments')
          .select('*')
          .headers({ 'session_id': sessionId });
      
        if (error) {
          console.error('Error fetching appointments:', error);
          return;
        }
      
        // Process and display the data
        console.log('Appointments:', data);
        // ... your code to display the appointments on the page ...
      }   

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
