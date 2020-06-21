//const
const PAGE_SIZE = 5;
//var
var postList = [];
var pageNo = 1;
var intersectionObserver;

//dom refferneces
var elPostContainer;
var elLoading;
var elFilterInput;

//init
var init = () => {
    initDomRefferences();
    setupEventListeners();
    initializeDomValues();
    setupIntersectionObserver();
    fetchMorePostsAndDisplay();
};

//initDomRefferences
var initDomRefferences = () => {
    elPostContainer = document.querySelector(".postsContainer");
    elLoading = document.querySelector(".lodinAnimationContianer");
    elFilterInput = document.querySelector(".filterInput");
};

//setupEventListeners
var setupEventListeners = () => {
    elFilterInput.addEventListener("input", filter);
};

//initializeDomValues
var initializeDomValues = () => {};

//intersectionObserver
var setupIntersectionObserver = () => {
    intersectionObserver = new IntersectionObserver(
        function (entries) {
            // isIntersecting is true when element and viewport are overlapping
            // isIntersecting is false when element and viewport don't overlap
            if (entries[0].isIntersecting === true) fetchMorePostsAndDisplay();
        },
        { threshold: [0] }
    );
    intersectionObserver.observe(document.querySelector(".loadingAnimation"));
};

//eventListeners

var filter = () => {
    let filterKey = elFilterInput.value;
    let posts = postList.filter((p) => p["body"].indexOf(filterKey) >= 0);
    display(posts);
};

// util
var fetchMorePostsAndDisplay = () => {
    // setTimeout(() => {
    setTimeout(
        (() => {
            elLoading.classList.remove("hide");
            console.log("hide removed");
            return function apply() {
                elLoading.classList.add("hide");
                console.log("hide added");
            };
        })(),
        10000
    );
    fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${PAGE_SIZE}&_page=${pageNo++}`
    )
        .then((r) => r.json())
        .then((resp) => {
            postList = postList.concat(resp);
            display(postList);
            elLoading.classList.add("hide");
        });
};

var display = (posts) => {
    let html = posts
        .map((p) => {
            return `
        <div class="post">
            <div class="idContainer">
                <div class="id">
                    ${p["id"]}
                </div>
            </div>
            <div class="messageContainer">
                <div class="message">
                    ${p["body"]}
                </div>
            </div>
        </div>
        `;
        })
        .reduce((a, b) => a + b, "");
    elPostContainer.innerHTML = html;
};

//init call
window.onload = init;
