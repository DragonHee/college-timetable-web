$( document ).ready(function() {
    $('.card-lecture').click(function () {
        var subjectName = $(this).children('.lecture-title').text();
        var lectureTime = $(this).find('.lecture-time > span').text();
        var classCode = $(this).find('.list-lecture-info li:nth-child(1)').text();
        var professorName = $(this).find('.list-lecture-info li:nth-child(2)').text();
        var location = $(this).find('.list-lecture-info li:nth-child(3)').text();

        lectureTime = lectureTime.replace(/(\s*)/g,"");
        lectureTime = lectureTime.slice(0, 5) + " " + lectureTime.slice(5,6) + " " + lectureTime.slice(6,11) + " " + lectureTime.slice(11,12) + " " + lectureTime.slice(12);

        $('#modal-lecture-info').find('.lecture-title').text(subjectName);
        $('#modal-lecture-info').find('.lecture-time span').text(lectureTime);
        $('#modal-lecture-info').find('.lecture-code:nth-child(2) span').text(classCode);
        $('#modal-lecture-info').find('.lecture-code:nth-child(3) span').text(professorName);
        $('#modal-lecture-info').find('.lecture-code:nth-child(4) span').text(location);

        $('#modal-lecture-info').modal('show');
    });

    $('.lecture-time > a').click(function () {
        var subjectName = $(this).find('.lecture-title').text().trim();
        var location = $(this).find('.lecture-location').text().trim();
        var classCode = $(this).find('.class-code').text();
        var professorName = $(this).find('.professor-name').text();
        var startTime = $(this).find('.start-time').text();
        var endTime = $(this).find('.end-time').text();
        var dayOfWeek = $(this).find('.day-of-week').text();

        var lectureTime = startTime + ":00 - " + endTime + ":00 | ";
        for(var i = 0; i < dayOfWeek.length; i++){
            lectureTime += "("+ dayOfWeek.charAt(i) + "), ";
        }
        lectureTime = lectureTime.substring(0, lectureTime.length - 2);

        classCode = "교과목 코드 : " + classCode;
        professorName = "담당 교수 : " + professorName;
        location = "강의실 : " + location;

        $('#modal-lecture-task').find('.lecture-title').text(subjectName);
        $('#modal-lecture-task').find('.lecture-time:nth-child(1) span').text(lectureTime);
        $('#modal-lecture-task').find('.lecture-code:nth-child(2) span').text(classCode);
        $('#modal-lecture-task').find('.lecture-code:nth-child(3) span').text(professorName);
        $('#modal-lecture-task').find('.lecture-code:nth-child(4) span').text(location);

        $('#modal-lecture-task').modal('show');
    });

    $('.modal-footer > .btn-primary').click(function() {
        var classCode = $(this).parent().prev().find('.lecture-code:nth-child(2) > span').text();
        classCode = classCode.substring(9);


    });

    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    $(function () {
        $('[data-toggle="popover"]').popover({
            container: 'body',
            html: true,
            placement: 'right',
            sanitize: false,
            content: function () {
                return $("#PopoverContent").html();
            }
        });
    });

    $("#search-form > .form-control").keyup(function() {
        var keyword = $(this).val().toUpperCase();

        $(".list-lecture > .card-lecture").hide();

        var temp1 = $('.list-lecture > .card-lecture > .lecture-title:contains("' + keyword + '")');
        var temp2 = $('.list-lecture > .card-lecture > .list-lecture-info > li:nth-child(-n + 2) > span:contains("' + keyword + '")');

        $(temp1).parent().show();
        $(temp2).parents('.card-lecture').show();
    })
});
