const expenseMan = new ExpenseManager()
const renderer = new Renderer()

renderer.renderAdd()

const addExpense = function() {
    let expense = {
        name: $("input:first-child").val(),
        amount: $("#amount").val(),
        group: $("select").val(),
        date: $("#date-select").val() || moment().format("YYYY-MM-DD")
    }
    console.log(expense)
    expenseMan.addExpense(expense)
}

const renderExpenses = async function(group, startDate = 0, endDate = 0) {
    !startDate ? startDate = moment(new Date(1971, 0, 1, 0, 0, 0, 0)).format("YYYY-MM-DD") : startDate = moment(startDate).format("YYYY-MM-DD")
    !endDate ? endDate = moment().format("YYYY-MM-DD") : endDate = moment(endDate).format("YYYY-MM-DD")
    const results = await expenseMan.getExpense(group, startDate, endDate)
    const total = await expenseMan.getTotal(group, startDate, endDate)
    renderer.renderExpenses(results, group, total)
}

const dateRange = function() {
    let start
    ($("#start-date").val()) ? start = moment($("#start-date").val()).format("YYYY-MM-DD") : start = moment(new Date(1971, 0, 1, 0, 0, 0, 0)).format("YYYY-MM-DD")
    let end
    ($("#end-date").val()) ? end = moment($("#end-date").val()).format("YYYY-MM-DD") : end = moment().format("YYYY-MM-DD")
    const group = ($("h2").html()).toLowerCase()
    renderExpenses(group, start, end)
}