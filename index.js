const individualDeskCount = 10;
const teamDeskCount = 5;
const desks = {
    individual: Array(individualDeskCount).fill(false),
    team: Array(teamDeskCount).fill(false)
};

const rates = {
    individual: {
        basic: 10,
        premium: 15,
        executive: 20
    },
    team: 25
};

function updateMembershipOptions() {
    const deskType = document.getElementById("desk-type").value;
    const membershipContainer = document.getElementById("membership-tier-container");
    if (deskType === "team") {
        membershipContainer.style.display = "none";
    } else {
        membershipContainer.style.display = "block";
    }
}

function bookDesk() {
    const deskType = document.getElementById("desk-type").value;
    const hours = parseInt(document.getElementById("hours").value);
    if (!hours || hours < 1 || hours > 24) {
        alert("Please enter a valid number of hours between 1 and 24.");
        return;
    }

    let rate;
    if (deskType === "individual") {
        const membershipTier = document.getElementById("membership-tier").value;
        rate = rates.individual[membershipTier];
    } else {
        rate = rates.team;
    }

    let totalCharge = rate * hours;
    if (hours > 3) {
        totalCharge *= 0.9; // 10% discount for more than 3 hours
    }

    let deskIndex;
    if (deskType === "individual") {
        deskIndex = desks.individual.indexOf(false);
        if (deskIndex !== -1) {
            desks.individual[deskIndex] = true;
            document.getElementById(`individual-${deskIndex}`).classList.add("booked");
        }
    } else {
        deskIndex = desks.team.indexOf(false);
        if (deskIndex !== -1) {
            desks.team[deskIndex] = true;
            document.getElementById(`team-${deskIndex}`).classList.add("booked");
        }
    }

    if (deskIndex === -1) {
        alert("No available desks for the selected type.");
        return;
    }

    document.getElementById("charge-amount").innerText = `$${totalCharge.toFixed(2)}`;
}

function generateDesks() {
    const individualDeskContainer = document.getElementById("individual-desks");
    const teamDeskContainer = document.getElementById("team-desks");

    for (let i = 0; i < individualDeskCount; i++) {
        const desk = document.createElement("div");
        desk.className = "desk";
        desk.id = `individual-${i}`;
        desk.innerText = i + 1;
        individualDeskContainer.appendChild(desk);
    }

    for (let i = 0; i < teamDeskCount; i++) {
        const desk = document.createElement("div");
        desk.className = "desk";
        desk.id = `team-${i}`;
        desk.innerText = i + 1;
        teamDeskContainer.appendChild(desk);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    generateDesks();
    updateMembershipOptions();
});
