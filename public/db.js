let db;

const request = indexedDB.open("budgetDatabase", 1);

request.onupgradeneeded = ({ target }) => {
    const db = target.result;

    db.createObjectStore("pending", {
      autoIncrement: true
    });
  };

  request.onsuccess = event => {

    db = event.target.result;

    if (navigator.online) {
        checkDatabase();
    }
    };

    request.onerror = function (event) {
        console.log("Error: " + event.target.errorCode);
    }

    function saveRecord(record)
    {
        const transaction = db.transaction(["pending"], "readwrite");
        
        const budgetStore = transaction.objectStore("pending");

        budgetStore.add(record);
    }

    function checkDatabase(){
        const transaction = db.transaction(["pending"], "readwrite");
        const budgetStore = transaction.objectStore("pending");

        const getAll = budgetStore.getAll();

        getAll.onsuccess = function() {
            if (getAll.result.length > 0) {
                fetch("/api/transaction/bulk", {
                  method: "POST",
                  body: JSON.stringify(getAll.result),
                  headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                  }
                })
                .then(response => response.json())
                .then(() => {
                  const transaction = db.transaction(["pending"], "readwrite");
          
                  const budgetStore = transaction.objectStore("pending");
          
                  budgetStore.clear();
                });
              }
        }
    }
    console.log("TEST 1");
    window.addEventListener("online", checkDatabase);
