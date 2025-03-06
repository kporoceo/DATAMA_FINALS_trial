const supabaseUrl = 'https://zstptnblkfdpjnmvgeng.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzdHB0bmJsa2ZkcGpubXZnZW5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExNjg0ODYsImV4cCI6MjA1Njc0NDQ4Nn0.q78LYNBD6hApZnR7OpnCz4swAnEJNwx4-sYClwY6SQg';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

if (!supabase) {
    console.error("Failed to initialize Supabase.");
}

// Price mapping for calculating total price
const servicePrices = {
    "Small - 550": 550, "Medium - 650": 650, "Large - 800": 800, "Extra Large - 975": 975,
    "Small - 300": 300, "Medium - 350": 350, "Large - 500": 500, "Extra Large - 650": 650,
    "Small - 350": 350, "Medium - 450": 450, "Large - 550": 550, "Extra Large - 700": 700,
    "Small - 250": 250, "Medium - 350": 350, "Large - 450": 450, "Extra Large - 600": 600,
    "None": 0
};

// Fetch and display appointments
async function fetchAppointments() {
    const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .order("createdAt", { ascending: false });

    if (error) {
        console.error("Error fetching appointments:", error);
        alert("There was an error fetching appointments. Please try again.");
        return;
    }

    const tbody = document.querySelector("#appointmentsTable tbody");
    tbody.innerHTML = ""; // Clear existing rows

    if (data.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center;">No appointments found.</td>
            </tr>
        `;
        return;
    }

    data.forEach(appointment => {
        const services = [
            appointment.royalGrooming,
            appointment.bathBlowDry,
            appointment.dematting,
            appointment.medicatedShampoo,
            appointment.boardingServices
        ].filter(service => service !== "None").join(", ");

        const totalPrice = services.split(", ").reduce((total, service) => {
            return total + (servicePrices[service] || 0);
        }, 0);

        const row = `
            <tr>
                <td>${appointment.ownerName}</td>
                <td>${appointment.phoneNumber}</td>
                <td>${appointment.emailAddress}</td>
                <td>${appointment.petName}</td>
                <td>${appointment.petType}</td>
                <td>${services}</td>
                <td>₱${totalPrice}</td>
                <td>${new Date(appointment.createdAt).toLocaleString()}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Fetch appointments on page load
fetchAppointments();

// Optional: Add a refresh button to manually fetch appointments
const refreshButton = document.createElement("button");
refreshButton.textContent = "Refresh Appointments";
refreshButton.style.marginTop = "20px";
refreshButton.style.padding = "10px 20px";
refreshButton.style.backgroundColor = "#f77b19";
refreshButton.style.color = "white";
refreshButton.style.border = "none";
refreshButton.style.borderRadius = "5px";
refreshButton.style.cursor = "pointer";
refreshButton.addEventListener("click", fetchAppointments);

document.querySelector(".container").appendChild(refreshButton);