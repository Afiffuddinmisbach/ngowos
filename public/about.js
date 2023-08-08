function saveBtn() {

    let Nama = document.getElementById('inputNama').value;
    let Keterangan = document.getElementById('inputKeterangan').value;

    if (Nama.trim() === '' || Keterangan.trim() === '') {
        const noneAlert = document.getElementById('noneAlert');
                noneAlert.classList.remove('d-none');
                setTimeout(() => {
                    noneAlert.classList.add('d-none');
                }, 4000);
        return;
    }

    const data = {
        Nama: Nama,
        Keterangan: Keterangan,
    };

    fetch("http://localhost:3000/insert", {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status == 'true') {
                const successAlert = document.getElementById('successAlert');
                successAlert.classList.remove('d-none');
                setTimeout(() => {
                    successAlert.classList.add('d-none');
                }, 3000);

                document.getElementById('inputNama').value = "";
                document.getElementById('inputKeterangan').value = "";

            } else {
                const warningAlert = document.getElementById('warningAlert');
                warningAlert.classList.remove('d-none');
                setTimeout(() => {
                    warningAlert.classList.add('d-none');
                }, 3000);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
fetch("http://localhost:3000/show", {
    method: 'GET', // or 'PUT'
})
    .then((response) => response.json())
    .then((result) => {
        console.log('Success:', result);
        if (result.status == 'true') {
            renderTampilan(result.data)
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });

function renderTampilan(data) {
    let view = "";
    for (let index = 0; index < data.length; index++) {
        view = view + `<div class="card border-secondary" style="margin: 10px">
                        <div class="card-body">
                            <h5 class="card-title" style="font-family: 'DM Serif Display'; font-weight:600;">${data[index].Nama} :</h5>
                            <p class="card-text" style="text-align: left;">${data[index].Keterangan}</p>
                        </div>
                      </div>`;

    }
    document.getElementById("resultsTestimoni").innerHTML = view;
}