class Resource {
    constructor(link,category,refName,description,session,semester,shareTo,owner_id) {
      this.category = category;
      this.refName = refName;
      this.session = session;
      this.semester = semester;
      this.description = description;
      this.owner = owner;
      this.link = link;
      this.shareTo = shareTo;
      this.sharerId = sharerId;
    }
}
  
module.exports = Resource;