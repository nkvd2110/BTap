

function WeirdInput(tag, action) {
    if (action === "tag.challenge.open") {
        return WeirdInput_load(tag);
    } else if (action === "tag.challenge.submit") {
        return WeirdInput_submit(tag);
    } else if (action === "tag.challenge.submit-failed") {
        return WeirdInput_load(tag);
    }

    let promise = $.Deferred();
    return promise.resolve();
}


function WeirdInput_load(tag) {
    let promise = $.Deferred();

    var modalContent = $(tag.refs.challengeContent);
    modalContent.empty();
    modalContent.append(HackerChallenge.formatAsSourceCode(tag.challenge.flag));

    $(tag.refs.answer).val("");

    $(tag.refs.answer).change(function() {
        WeirdInput_handle_input(tag);
    });
    $(tag.refs.answer).on("input", function() {
        WeirdInput_handle_input(tag);
    });

    return promise.resolve();
}


function WeirdInput_submit(tag) {
    let promise = $.Deferred();
    return promise.resolve();
}


function WeirdInput_handle_input(tag) {
    let input = $(tag.refs.answer);
    let value = input.val();
    let a = "a".repeat(value.length);
}

