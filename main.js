const yourApiKey = document.querySelector("#apiKey")
const ingredients = document.querySelector("#ingredients")
const foodMood = document.querySelector("#foodMood")
const result = document.querySelector(".submit")
const recipeOutput = document.querySelector("#recipe-output")
 let output = document.querySelector(".output").style.display = "none"
let loader = document.querySelector(".loader").style.display = "flex"

function mistralChat(prompt, apiKey) {
    return fetch("https://api.mistral.ai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "codestral-latest",
            messages: [
                {
                    role: "system",
                    content: "You are an expert in easy and fast recipes, that must always be gluten free. You must use some of the ingredients that I give, but you are allowed to add more ingredients to the recipe. The measurements in the recipe needs to be in the metric system."
                },
                {role: "user", content: prompt}
            ],
            temperature: 0.7,
            max_tokens: 512
        })
    })
        .then(response => response.json())
        .then(function (data) {
            let dataChoices = data.choices[0].message.content;
            let loader = document.querySelector(".loader").style.display = "none"
            console.log(data)
            console.log(dataChoices);
            recipeOutput.innerText = dataChoices

        });
}

result.addEventListener("click",  () => {
    let apiKeyValue = yourApiKey.value
    let foodMoodValue = foodMood.value
    let ingredientsValue = ingredients.value

    let output = document.querySelector(".output").style.display = "block"

    mistralChat(`${foodMoodValue}. I have: ${ingredientsValue}`, apiKeyValue)
})

