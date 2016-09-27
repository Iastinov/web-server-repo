let imagesDB = []

let addImages = (newItem) => {
    let obj = {}
    if (newItem) {
        for(var item of newItem){
            item = item.toString().split('=')
            obj[item[0]]  =  decodeURIComponent(item[1].split('+').join(' '))
           
        }
         imagesDB.push(obj)
    }
    console.log(imagesDB)
}

module.exports = {
    addImages: addImages
}