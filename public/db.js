let db;

const request = indexedDB.open("budgetDatabase", 1);

request.onupgradeneeded = ({ target }) => {
    const db = target.result;

    const budgetStore = db.createObjectStore("pending", {
      autoIncrement: true
    });

    // budgetStore.createIndex("itemAmount", "itemAmount");
    // budgetStore.createIndex("transactionName", "name");
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

        const getAll = budgetStore.getAll();

        getAll.onsuccess = () => {
            //call fetch function, if result length is greater than 0 they do a fetch post, in post do a stringify to the results
        console.log(getAllItems.result);
        };
    }
    // //second .then repeats these two lines in serviceworker.js fetch, then a store.clear
    // const transactionType = budgetStore.index("type");
    // // const transactionName = budgetStore.index("name");
    // // const transactionAmount = budgetStore.index("amount");


    // budgetStore.add({ listID: "1", transactionType: "withdrawal", transactionName: "Beer", transactionAmount: "7"});
    // budgetStore.add({ listID: "2", transactionType: "withdrawal", transactionName: "Coffee", transactionAmount: "5"});
    // budgetStore.add({ listID: "3", transactionType: "withdrawal", transactionName: "Lunch", ,transactionAmount: "20"});