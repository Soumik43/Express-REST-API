function User(user) {
    const { name, profileLink, profileImage, intro, id } = user;
    this.name = name || "";
    this.profileImage = profileImage || "";
    this.profileLink = profileLink || "";
    this.intro = intro || "";
    this.id = id || "";
}

module.exports = User;
