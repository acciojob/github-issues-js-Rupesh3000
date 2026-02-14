//your code here
  const loadNextPage = document.getElementById("load_next");
  const loadPrevPage = document.getElementById("load_prev");
  const issuesIist = document.getElementById("issues_list");
  const pageNumber = document.getElementById("page_number");

  let currentPage = 1;
  const renderIssues = (data) => {
    issuesIist.innerHTML = "";
    let issueName = data.map((obj) => {
      return obj.title;
    });
    issueName.forEach((element) => {
      let li = document.createElement("li");
      li.innerHTML = element;
      issuesIist.appendChild(li);
    });
  };
  const getApiData = async (page) => {
    pageNumber.innerText = currentPage;
    try {
      const res = await fetch(
        `https://api.github.com/repositories/1296269/issues?page=${page}&per_page=5`
      );
      const data = await res.json();
      renderIssues(data);
    } catch (error) {
      console.log(error);
    }
  };
  const loadNext = () => {
    currentPage++;
    getApiData(currentPage);
  };

  const loadPrev = () => {
    if (currentPage > 1) {
      currentPage--;
      getApiData(currentPage);
    }
  };

  loadNextPage.addEventListener("click", loadNext);
  loadPrevPage.addEventListener("click", loadPrev);

  getApiData(currentPage);
