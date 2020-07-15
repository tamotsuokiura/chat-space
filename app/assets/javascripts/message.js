$(function(){
  function buildHTML(data){
    if (data.image){
      let html = `<div class="Chat-main__Message-list__Container__Box">
                    <div class="Chat-main__Message-list__Container__Box__Info">
                      <div class="Chat-main__Message-list__Container__Box__Info--name">
                        ${data.user_name}
                      </div>
                      <div class="Chat-main__Message-list__Container__Box__Info--time">
                        ${data.created_at}
                      </div>
                    </div>
                    <div class="Chat-main__Message-list__Container__Box__message">
                      <p>${data.content}</p>
                      <img class="Message__image" src="${data.image}">
                    </div>
                  </div>`
      return html;
    }else{
      let html = `<div class="Chat-main__Message-list__Container__Box">
                    <div class="Chat-main__Message-list__Container__Box__Info">
                      <div class="Chat-main__Message-list__Container__Box__Info--name">
                        ${data.user_name}
                      </div>
                      <div class="Chat-main__Message-list__Container__Box__Info--time">
                        ${data.created_at}
                      </div>
                    </div>
                    <div class="Chat-main__Message-list__Container__Box__message">
                      <p>${data.content}</p>
                    </div>
                  </div>`
      return html;
    };
  }

  $('#form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $(".Chat-main__Message-list__Container").append(html);
      console.log($("#form"));
      $("#form")[0].reset();
      $(".Chat-main__Message-list__Container").animate({scrollTop: $(".Chat-main__Message-list__Container")[0].scrollHeight});
      $(".Chat-main__Message-form__Container__submit").prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  })
});