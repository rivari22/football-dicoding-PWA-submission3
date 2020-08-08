var dbPromised = idb.open("football", 1, function(upgradeDb) {
    var articlesObjectStore = upgradeDb.createObjectStore("articles", {
    keyPath: "id"
    });
    articlesObjectStore.createIndex("name", "name", { unique: false });
});

function saveForLater(article) {
dbPromised
    .then(function(db) {
    let tx = db.transaction("articles", "readwrite");
    let store = tx.objectStore("articles");
    console.log(article);
    store.put(article);
    return tx.complete;
    })
    .then( () => {
            M.toast({html: "Artikel berhasil Tersimpan"})
    })
}

function getAll() {
    return new Promise(function(resolve, reject) {
    dbPromised
        .then(function(db) {
        var tx = db.transaction("articles", "readonly");
        var store = tx.objectStore("articles");
        return store.getAll();
        })
        .then(function(articles) {
        resolve(articles);
        });
    });
}

function getById(id) {
    return new Promise(function(resolve, reject) {
    dbPromised
    .then(function(db) {
        var tx = db.transaction("articles", "readonly");
        var store = tx.objectStore("articles");
        return store.get(id);
    })
    .then(function(article) {
        console.log(article)
        resolve(article);
    });
});
}

const dbDelete = id => {
    return new Promise((resolve, reject) => {
        dbPromised
        .then(db => {
            const transaction = db.transaction("articles", `readwrite`);
            transaction.objectStore("articles").delete(id);
            return transaction;
        }).then(transaction => {
            if (transaction.complete) {
                resolve(true)
            } else {
                reject(new Error(transaction.onerror))
            }
        })
    })
}
