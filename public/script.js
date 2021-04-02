const currentPage = location.pathname
const menuItens = document.querySelectorAll("header .links a")

for (item of menuItens) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}

function paginate(selectedPage, totalPages) {
    let pages = [],
        oldPage

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {

        const firstAndLast = currentPage == 1 || currentPage == 2 || currentPage == totalPages - 1 || currentPage == totalPages
        const pageBeforeSelectedPage = currentPage >= selectedPage - 1
        const pageAfterSelectedPage = currentPage <= selectedPage + 1

        if (firstAndLast || pageBeforeSelectedPage && pageAfterSelectedPage) {

            if (oldPage && currentPage - oldPage > 2) {
                pages.push("...")
            } else if (oldPage && currentPage - oldPage == 2) {
                pages.push(currentPage - 1)
            }

            pages.push(currentPage)

            oldPage = currentPage
        }
    }

    return pages
}

function createPagination(pagination) {

    const filter = pagination.dataset.filter
    const page = Number(pagination.dataset.page)
    const total = Number(pagination.dataset.total)
    const pages = paginate(page, total) 

    let elements = ""

    for (let page of pages) {

        if (String(page).includes("...")) {
            elements += `<span> ${page} </span>`
        } else {

            if (filter) {
                elements += `<a href="?page=${page}&filter=${filter}"> ${page} </a>`
            } else {
                elements += `<a href="?page=${page}"> ${page} </a>`
            }
            
        }
        
    }

    pagination.innerHTML = elements
}

const pagination = document.querySelector(".pagination")

if (pagination) {
    createPagination(pagination)

}