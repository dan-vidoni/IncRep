$.get(
  "headerMessage.txt",
  function(data) {
    const headerMessage = data ? data : "default";
    $("div.headerMessage>p").text(headerMessage);
  },
  "text"
);
