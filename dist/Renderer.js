class Renderer {
    constructor() {
    }

    renderAdd() {
        $("#container").empty()
        $("#total").remove()
        const addTemplate = Handlebars.compile($("#add-template").html())
        $("#container").append(addTemplate())
    }

    renderExpenses(expenses, group, total) {
        $("#container").empty()
        $("#total").remove()
        const seeTemplate = Handlebars.compile($("#see-template").html())
        const expensesHTML = seeTemplate({ expenses, group: (group[0].toUpperCase()+group.slice(1)) })
        $("#container").append(expensesHTML)
        $("#headbar").append(`<p id="total"><b>Total: ${total} ₪</b></p>`)
    }
}