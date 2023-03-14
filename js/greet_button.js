const model_dialog = document.querySelector("#modeldialog")

function sendSupergreeting(model_id, rnd) {
    const url = `/sendhug?to=${model_id}&uniquetime=${new Date().getTime()}&friend_badge_id=12&friend_badge_hug_id=101&rnd=${rnd}`;
    return fetch(url).then(res => res.text());
}

function batchSendSupergreetings(count = 1, model_id) {
    const promises = [];
    const rnd = new Date().valueOf();
    for (let i = 0; i < count; i++) {
        promises.push(sendSupergreeting(model_id, (rnd + i).toString()));
    }
    //console.log(promises);
    Promise.allSettled(promises)
        .then((results) =>
            results.reduce((acc, r) => {
                if (r.status === 'fulfilled' && r.value.includes('<Error responsetype ="0">')) {
                    console.info("Successfully sent supergreeting!");
                    acc.fullfilled += 1;
                } else {
                    console.error(`Failed to send supergreeting. Response ${r.value}`);
                    acc.rejected += 1;
                }
                return acc;
            }, { fullfilled: 0, rejected: 0 })
        )
        .then(result => {
            // Hide modeldialog and show result message.
            const fails = ` Failed to send ${result.rejected} supergreeting(s).`
            const model_name = document.querySelector("#modeldialog .modelname_title > a:nth-child(1)").textContent;
            modeldialog_hide();
            messagebox({ msg: `Sent ${result.fullfilled} supergreeting${result.fullfilled > 1 ? 's' : ''} to ${model_name}!` + (result.rejected ? fails : ''), autohide: false })
        });
}

const onMutation = (mutations) => {
    // console.log(mutations)
    if (mutations.length === 1 && mutations[0].addedNodes.length > 1) {
        // optimize the most frequent scenario: one element is added/removed
        let model_id = mutations[0].addedNodes[1].attributes[0].nodeValue;
        model_id = model_id.substring(23, model_id.search("&"));

        const container = document.createElement("div");
        container.id = "modeldialog_plus";
        container.innerHTML = '<span class="modelname_title">goSu+</span>';
        mutations[0].target.append(container)

        const greet_input = document.createElement("div");
        greet_input.innerHTML = `<label>Super greetings: </label><input type="number" id="send-greeting-count" min="1" value="1">`;
        const btn = document.createElement("a");
        btn.classList = 'button coloridx4 nappula';
        btn.innerHTML = '<span>Send</span>';
        btn.onclick = () => {
            // console.log("Clicked supergreet button");
            const greeting_count = parseInt(document.querySelector("#send-greeting-count").value);
            if (greeting_count > 0) {
                console.debug("Sending out supergreetings");
                batchSendSupergreetings(greeting_count, model_id);
            }
        };
        greet_input.appendChild(btn);

        container.appendChild(greet_input);
    }
}


var observer = new MutationObserver(onMutation);
observer.observe(model_dialog, {
    childList: true, // report added/removed nodes
    //subtree: true,   // observe any descendant elements
})