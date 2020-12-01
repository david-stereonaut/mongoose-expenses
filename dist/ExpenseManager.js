class ExpenseManager {
    constructor() {
        this.expenses = []
        this.total = []
    }

    addExpense(expense) {
        $.post('/expense', expense, function(result) {
            console.log(result)
        })
    }
    
    getExpense(group, startDate = 0, endDate = 0) {
        return new Promise(resolve => {
            $.get(`/expenses/${group}/false/${startDate}/${endDate}`, (result) => {
                let newExpenses = []
                result.forEach( ({name, amount, group, date}) => {
                    (newExpenses.push({
                        name,
                        amount,
                        group: (group[0].toUpperCase()+group.slice(1)),
                        date: moment(date).format("DD/MM/YYYY")
                    }))
                })
                this.expenses = newExpenses
                resolve(this.expenses)
            })
        })
    }

    getTotal(group, startDate = 0, endDate = 0) {
        return new Promise(resolve => {
            $.get(`/expenses/${group}/true/${startDate}/${endDate}`, (result) => {
                this.total = result[0].totalExpenses
                resolve(this.total)
            })
        })
    }

}