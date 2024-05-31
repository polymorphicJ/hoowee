let profiles = [];

function addToList() {
    const skill = document.getElementById('skill').value;
    const level = parseInt(document.getElementById('level').value);
    const npcLocation = document.getElementById('npcLocation').value;
    const gear = document.getElementById('gear').value;
    const lootBuryBones = document.getElementById('lootBuryBones').checked;
    const useOffensivePrayer = document.getElementById('useOffensivePrayer').checked;
    const useProtectionPrayer = document.getElementById('useProtectionPrayer').checked;
    const gearIds = document.getElementById('gear').value.split(',').map(id => parseInt(id.trim()));

    if (!skill || !level || !npcLocation) {
        alert('All fields are required');
        return;
    }

    const profile = {
        skill,
        level,
        npcLocation,
        gear,
        lootBuryBones,
        useOffensivePrayer,
        useProtectionPrayer,
        gearIds
    };

    profiles.push(profile);
    updateProfileTable();
}

function updateProfileTable() {
    const tableBody = document.querySelector('#profileTable tbody');
    tableBody.innerHTML = '';
    profiles.forEach((profile, index) => {
        const row = document.createElement('tr');
        row.style.backgroundColor = 'lightgrey';
        row.innerHTML = `
            <td>${profile.skill}</td>
            <td>${profile.level}</td>
            <td>${profile.npcLocation}</td>
            <td>${profile.gear}</td>
            <td>${profile.lootBuryBones ? 'Yes' : 'No'}</td>
            <td>${profile.useOffensivePrayer ? 'Yes' : 'No'}</td>
            <td>${profile.useProtectionPrayer ? 'Yes' : 'No'}</td>
            <td><button class="btn btn-danger btn-sm" onclick="removeFromList(${index})">Remove</button></td>
        `;

        tableBody.appendChild(row);
    });
}

function removeFromList(index) {
    profiles.splice(index, 1);
    updateProfileTable();
}

function saveAllProfiles() {
    const profileName = document.getElementById('profileName').value;
    if (!profileName) {
        alert('Please enter a profile name.');
        return;
    }

    const blob = new Blob([JSON.stringify(profiles, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `state_${profileName}.json`;
    link.click();
}
function clearTable() {
    const tableBody = document.querySelector('#profileTable tbody');
    tableBody.innerHTML = '';
}
