export class IntrstingtypesMapper {

  private mapping: any[] = [
    {
      enumValue: "BOOK",
      label: "Book",
      icon: "book"
    },
    {
      enumValue: "BLOG",
      label: "Blog/Article",
      icon: "chatbubbles"
    },
    {
      enumValue: "VIDEO",
      label: "Video/Talk",
      icon: "videocam"
    },
    {
      enumValue: "PODCAST",
      label: "Podcast",
      icon: "musical-notes"
    },
    {
      enumValue: "ONLINE_COURSE",
      label: "Online course",
      icon: "bulb"
    }
  ];

  toLabel(enumValue: string): string {
    let item = this.mapping.filter(mapping => mapping.enumValue === enumValue)[0];
    return item ? item.label : "";
  }

  toIcon(enumValue: string): string {
    let item = this.mapping.filter(mapping => mapping.enumValue === enumValue)[0];
    return item ? item.icon : "qr-scanner";
  }

}
