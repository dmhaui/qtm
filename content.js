document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'q') {
        event.preventDefault();

        navigator.clipboard.readText().then((selectedText) => {
            console.log(selectedText);
            if (selectedText.length > 0) {
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                const raw = JSON.stringify({
                    "user_id": "545458", // nhập bừa số vào đây, để server nó lưu lịch sử đoạn chat
                    "api_key": "AIzaSyBWloAlNFD5PWU55oXzpA1YVCJqdEUlkt4", // nhập gemini apikey vào đây
                    "user_input": selectedText
                });

                const requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow"
                };

                fetch("https://geminiapi-djm-hauis-projects.vercel.app/chat", requestOptions)
                .then(response => response.text())
                .then(data => {
                    const responseText = JSON.parse(data).response;
                    navigator.clipboard.writeText(responseText).then(() => {
                        console.log("OK");
                    });
                })
                .catch(error => {
                    console.error('not Oke:', error);
                });
            }
        }).catch(err => {
            console.error('không đọc được: ', err);
        });
    }
});
