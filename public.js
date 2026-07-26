async function audit() {

    const url = document.getElementById("url").value;

    const result = document.getElementById("result");

    result.innerHTML = "Loading...";

    const res = await fetch("/audit", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            url
        })

    });

    const data = await res.json();

    result.innerHTML = JSON.stringify(data, null, 2);

}
