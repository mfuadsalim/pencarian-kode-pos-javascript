$('#search-button').on('click', function() {
    let provinceName = document.getElementById('search-province').value.toUpperCase()
    let cityName = document.getElementById('search-city').value.toUpperCase()
    let districtName = document.getElementById('search-district').value.toUpperCase()

    $.ajax({
        url: 'postal_code.json',
        success: result => {
            let searchResult = '';
            let provinceFound = false;
            let cityFound = false;
            let districtFound = false;

            const {provinsi, postal} = result

            Object.values(provinsi).forEach(p => {
                if(p.province_name === provinceName) {
                    provinceFound = true;

                    let indexProvince = postal[p.province_code]
                    
                    let i = 0;
                    for(i; i < indexProvince.length; i++) {
                        if(indexProvince[i].city === cityName) {
                            cityFound = true;
                            
                            if(indexProvince[i].sub_district === districtName) {
                                districtFound = true;
                                break;
                            }
                        }
                    }

                    if(provinceFound && cityFound && districtFound) {
                        searchResult += `
                            <div class="data-container">
                                <h3 class="data-kodepos">Kode Pos: ${indexProvince[i].postal_code}</h3>
                            </div>
                            `;
                        $('#result-container').html(searchResult);
                        return;
                    }
                }
            });

            if(!provinceFound || !cityFound || !districtFound) {
                alert("Data yang Anda masukkan salah. Cek kembali!");
                return false;
            }
        },
        error: () => console.log('Error')
    })
})