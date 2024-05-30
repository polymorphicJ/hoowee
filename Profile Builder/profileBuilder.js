let profiles = [];

function addToList() {
    const profile = {
        skill: document.getElementById('skill').value,
        level: parseInt(document.getElementById('level').value),
        npcLocation: document.getElementById('npcLocation').value,
        gear: document.getElementById('gear').value,
        lootBuryBones: document.getElementById('lootBuryBones').checked,
        useOffensivePrayer: document.getElementById('useOffensivePrayer').checked,
        useProtectionPrayer: document.getElementById('useProtectionPrayer').checked,
        gearIds: document.getElementById('gear').value.split(',').map(id => parseInt(id.trim()))
    };

    profiles.push(profile);
    updateProfileTable();
    const preName = document.getElementById('profileName').value;
    document.getElementById('profileForm').reset();
    document.getElementById('profileName').value=preName;
}

function updateProfileTable() {
    const tableBody = document.querySelector('#profileTable tbody');
    tableBody.innerHTML = '';
    profiles.forEach((profile, index) => {
        const row = document.createElement('tr');

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
