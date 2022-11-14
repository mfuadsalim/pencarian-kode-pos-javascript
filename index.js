
$(document).ready(function () {
    var selectedProv = {};
    var selectedKab = {};
    var selectedKec = {};

    // load provinsi
    $.getJSON('prov.json', function(data) {
        var output = '<option>-- Pilih Provinsi --</option>\n';
        $.each(data, function(key, val) {
            output += ('<option value=\"' + val.id + '\">' + val.nama + '</option>\n');
            // console.log(output);
            
        });
        $('#prov').html(output);
    });
    
    // load kabupaten
    $('#prov').change(function () {
        // var selectedProv = $('#prov option:selected').val();
        selectedProv[0] = $('#prov option:selected').val();
        selectedProv[1] = $('#prov option:selected').text();
        console.log(selectedProv[0]);
        $.getJSON('kabupaten/' + selectedProv[0] + '.json', function(data) {
            var output = '<option>-- Pilih Kabupaten --</option>\n';
            $.each(data, function(key, val) {
                output += ('<option value=\"' + val.id + '\">' + val.nama.slice(5) + '</option>\n');
                // console.log(output);
                
            });
            $('#kab').html(output);
        })
        .fail(function() {$('#kab').html('<option>-- Pilih Kabupaten --</option>\n');});
    });

    // load kecamatan
    $('#kab').change(function () {
        // var selectedKab = $('#kab option:selected').val();
        selectedKab[0] = $('#kab option:selected').val();
        selectedKab[1] = $('#kab option:selected').text();
        console.log(selectedKab[0]);
        $.getJSON('kecamatan/' + selectedKab[0] + '.json', function(data) {
            var output = '<option>-- Pilih Kecamatan --</option>\n';
            $.each(data, function(key, val) {
                output += ('<option value=\"' + val.id + '\">' + val.nama.toUpperCase() + '</option>\n');
                // console.log(output);
                
            });
            $('#kec').html(output);
        })
        .fail(function() {$('#kec').html('<option>-- Pilih Kecamatan --</option>\n');});
    });

    // display result
    $('#kec').change(function () {
        selectedKec[0] = $('#kec option:selected').val();
        selectedKec[1] = $('#kec option:selected').text();
        console.log(selectedKec[0]);
    });

    function capitalCase(mySentence) {
        const words = mySentence.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
        return words;
    }

    $('#searchBtn').click(function() {
        console.log('IM HERE');
        $.getJSON('kodepos.json', function(data) {
            var output = '';
            $.each(data, function(key, val) {
                // console.log(val.sub_district);
                // console.log(selectedKec[1]);
                if(val.sub_district === selectedKec[1]) {
                // if(val.sub_district.localCompare(selectedKec[1]) == 0) {
                    console.log('IM HERE2');
                    output += ('<div class=\"urban\">' + val.urban + 
                    '</div><div class=\"res-card\"><p class="code">' + val.postal_code + '</p>' + 
                    '<p>Daerah Kecamatan '+ capitalCase(val.urban) + 
                    ', Kecamatan '+ capitalCase(selectedKec[1]) + 
                    ', Kabupaten '+ capitalCase(selectedKab[1]) + 
                    ', Provinsi '+ capitalCase(selectedProv[1]) + 
                    '</p></div>\n');
                }
            });
            $('#res').html(output);
        });
    });
        
});