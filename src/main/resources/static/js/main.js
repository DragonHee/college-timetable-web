$( document ).ready(function() {
    $(document).on('click', '.card-lecture', function () {
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

    $(document).on('click', '.lecture-time > a', function () {
        var subjectName = $(this).find('.lecture-title').text().trim();
        var location = $(this).find('.lecture-location').text().trim();
        var classCode = $(this).find('.class-code').text();
        var professorName = $(this).find('.professor-name').text();
        var startTime = $(this).find('.start-time').text();
        var endTime = $(this).find('.end-time').text();
        var dayOfWeek = $(this).find('.day-of-week').text();

        $.ajax({
            url:"/memo/get",
            type:"POST",
            dataType:"json",
            data : {
                classCode : classCode
            },
            success:function(result){
                if(result != null){
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

                    $('.lecture-memo > ul > li').remove();

                    for(var i = 0 ; i < result.length; i++){
                        $.fn.addMemo(result[i].memoId, result[i].memoTitle, result[i].memoContent);
                    }
                    $('[data-toggle="tooltip"]').tooltip();
                }
            }
        });

        $('#modal-lecture-task').modal('show');
    });

    $('.modal-footer > .btn-primary').click(function() {
        var classCode = $(this).parent().prev().find('.lecture-code:nth-child(2) > span').text().replace(/교과목 코드 : /gi,"");
        var timeInfo = $(this).parent().prev().find('.lecture-time span').text();
        timeInfo = timeInfo.replace(/:00/gi, "").replace(/\|/gi,"")
            .replace(/\(/gi, "").replace(/\)/gi,"").replace(/,/gi,"")
            .replace(/-/gi, "");
        var timeArr = timeInfo.split("  ");
        var startTime = timeArr[0];
        var endTime = timeArr[1];
        var dayOfWeek = timeArr[2];

        $.ajax({
            url:"/schedule/put",
            type:"POST",
            dataType:"json",
            data : {
                classCode : classCode,
                startTime : startTime,
                endTime : endTime,
                dayOfWeek : dayOfWeek
            },
            success:function(result){
                console.log(result);
                if(result != null){
                    alert("등록이 완료되었습니다.");
                    $.fn.addLecture(result);
                    $('#modal-lecture-info').modal('hide');
                    $('.list-lecture-info > li:nth-child(1) > span:contains(' + classCode + ')').parents('.card-lecture').remove();
                    $('[data-toggle="tooltip"]').tooltip();
                }
            },
            error: function (err) {
                console.log(err);
                alert("등록에 실패하였습니다.(수강 과목의 시간을 확인해주세요)");
            }
        });

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

    $('#search-form > .form-control').keyup(function() {
        var keyword = $(this).val().toUpperCase();

        $(".list-lecture > .card-lecture").hide();

        var temp1 = $('.list-lecture > .card-lecture > .lecture-title:contains("' + keyword + '")');
        var temp2 = $('.list-lecture > .card-lecture > .list-lecture-info > li:nth-child(-n + 2) > span:contains("' + keyword + '")');

        $(temp1).parent().show();
        $(temp2).parents('.card-lecture').show();
    })

    $('.btn-danger').click(function () {
        var classCode = $('#modal-lecture-task').find('.lecture-code:nth-child(2) span').text();
        classCode = classCode.replace(/교과목 코드 : /gi,"").trim();

        $.ajax({
            url:"/schedule/delete",
            type:"POST",
            dataType:"json",
            data : {
                classCode : classCode
            },
            success:function(result){
                if(result != null){
                    alert('삭제가 완료 되었습니다.');
                    var subjectName = result.subjectName;
                    var location = result.location;
                    var classCode = result.classCode;
                    var professorName = result.professorName;
                    var startTime = result.startTime;
                    var endTime = result.endTime;
                    var dayOfWeek = result.dayOfWeek;

                    var timeInfo = pad(startTime, 2) + ":00 - " + pad(endTime, 2) + ":00 | ";
                    console.log(timeInfo);
                    for(var i = 0 ; i < dayOfWeek.length; i++){
                        timeInfo += '(' + dayOfWeek.charAt(i) + '), '
                    }
                    timeInfo = timeInfo.substring(0, timeInfo.length - 2);

                    for(var i = 0 ; i < result.dayOfWeek.length; i++){
                        if(result.dayOfWeek.charAt(i) == '월'){
                            var tagLocation = $('.timeline-vertical > .top-info > .day:contains("Mon")');
                            tagLocation.parent().siblings('ul').find('.class-code:contains("' + result.classCode + '")').parents('.lecture-time').remove();
                        }else if(result.dayOfWeek.charAt(i) == '화'){
                            var tagLocation = $('.timeline-vertical > .top-info > .day:contains("Tue")');
                            tagLocation.parent().siblings('ul').find('.class-code:contains("' + result.classCode + '")').parents('.lecture-time').remove();
                        }else if(result.dayOfWeek.charAt(i) == '수'){
                            var tagLocation = $('.timeline-vertical > .top-info > .day:contains("Wed")');
                            tagLocation.parent().siblings('ul').find('.class-code:contains("' + result.classCode + '")').parents('.lecture-time').remove();
                        }else if(result.dayOfWeek.charAt(i) == '목'){
                            var tagLocation = $('.timeline-vertical > .top-info > .day:contains("Thu")');
                            tagLocation.parent().siblings('ul').find('.class-code:contains("' + result.classCode + '")').parents('.lecture-time').remove();
                        }else if(result.dayOfWeek.charAt(i) == '금'){
                            var tagLocation = $('.timeline-vertical > .top-info > .day:contains("Fri")');
                            tagLocation.parent().siblings('ul').find('.class-code:contains("' + result.classCode + '")').parents('.lecture-time').remove();
                        }
                    }

                    var addPoint = $('.list-lecture');

                    var str = '';
                    str += '<li class="card-lecture" >';
                    str += '<a class="lecture-title" href="#">' + subjectName + '</a>';
                    str += '<h6 class="lecture-time">';
                    str += '<i class="material-icons ic-lecture-info">access_time</i>';
                    str += '<span>' + timeInfo + '</span>';
                    str += '</h6>';
                    str += '<ul class="list-lecture-info">';
                    str += '<li>교과목 코드 : <span>' + classCode + '</span></li>';
                    str += '<li>담당 교수 : <span>' + professorName + '</span></li>';
                    str += '<li>강의실 : <span>' + location + '</span></li>';
                    str += '</ul>';
                    str += '</li>';

                    //최근에 지운 수강목록을 상단에 위치하게 한다.
                    addPoint.prepend(str);

                    $('#modal-lecture-task').modal('hide');
                }else{
                    alert('삭제에 실패하였습니다.');
                }
            }
        });
    })



    function pad(n, width) {
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
    }
    $.fn.addMemo = function(memoId, memoTitle, memoContent){
        var str = '';
        str += '<li class="memo-list">';
        str += '<div class="memo-id" style="display:none">' + memoId + '</div>';
        str += '<div class="memo-content" data-toggle="tooltip" data-placement="top" title="" data-original-title="' + memoContent + '">';
        str += '<i class="material-icons ic-lecture-noti">assignment</i>';
        str += '<span class="lecture-noti-title">' + memoTitle + '</span>';
        str += '</div>';
        str += '<div class="memo-btn">';
        str += '<a href="#"><i onclick="deleteMemo(' + memoId + ')" class="material-icons ic-lecture-noti">delete</i></a>';
        str += '</div>';
        str += '</li>';

        $('.lecture-memo > ul').append(str);
        $('[data-toggle="tooltip"]').tooltip();
    }

    $.fn.addLecture = function(result){
        var str = '';
        str += '<li class="lecture-time ';
        if(result.lectureVO.endTime - result.lectureVO.startTime == 2) str += 'two-hr ';
        str += 'hr-' + result.lectureVO.startTime + '" data-event="lecture-0' + (Math.floor(Math.random() * 9) + 1) + '">';
        str += '<a href="#">';
        str += '<div class="class-code" style="display:none">' + result.lectureVO.classCode + '</div>';
        str += '<div class="professor-name" style="display:none">' + result.lectureVO.professorName + '</div>';
        str += '<div class="start-time" style="display:none">' + result.lectureVO.startTime + '</div>';
        str += '<div class="end-time" style="display:none">' + result.lectureVO.endTime + '</div>';
        str += '<div class="day-of-week" style="display:none">' + result.lectureVO.dayOfWeek + '</div>';
        str += '<div class="lecture-info">';
        str += '<h6 class="lecture-title">';
        str += result.lectureVO.subjectName;
        str += '</h6>';
        str += '<h6 class="lecture-location">';
        str += result.lectureVO.location;
        str += '</h6>';
        str += '</div>';

        str += '<ul>';
        for(var i = 0 ; i < result.memoList.length; i++){
            str += '<li>';
            str += '<div class="lecture-noti" data-toggle="tooltip" data-placement="top" title="" data-original-title="' + result.memoList[i].memoContent + '">';
            str += '<i class="material-icons ic-lecture-noti">assignment</i>';
            str += '<span class="lecture-noti-title">' + result.memoList[i].memoTitle + '</span>';
            str += '</div>'
            str += '<div class="memo-id" style="display:none">' + result.memoList[i].memoId + '</div>';
            str += '<div class="memo-title-' + (i + 1) + '" style="display:none">' + result.memoList[i].memoTitle + '</div>';
            str += '<div class="memo-content-' + (i + 1) + '" style="display:none">' + result.memoList[i].memoContent + '</div>';
            str += '</li>';
        }
        str += '</ul>';
        str += '</a>';
        str += '</li>';

        for(var i = 0 ; i < result.lectureVO.dayOfWeek.length; i++){
            if(result.lectureVO.dayOfWeek.charAt(i) == '월'){
                var tagLocation = $('.timeline-vertical > .top-info > .day:contains("Mon")');
                tagLocation.parent().siblings('ul').append(str);
            }else if(result.lectureVO.dayOfWeek.charAt(i) == '화'){
                var tagLocation = $('.timeline-vertical > .top-info > .day:contains("Tue")');
                tagLocation.parent().siblings('ul').append(str);
            }else if(result.lectureVO.dayOfWeek.charAt(i) == '수'){
                var tagLocation = $('.timeline-vertical > .top-info > .day:contains("Wed")');
                tagLocation.parent().siblings('ul').append(str);
            }else if(result.lectureVO.dayOfWeek.charAt(i) == '목'){
                var tagLocation = $('.timeline-vertical > .top-info > .day:contains("Thu")');
                tagLocation.parent().siblings('ul').append(str);
            }else if(result.lectureVO.dayOfWeek.charAt(i) == '금'){
                var tagLocation = $('.timeline-vertical > .top-info > .day:contains("Fri")');
                tagLocation.parent().siblings('ul').append(str);
            }
        }
    };
});
// 메모삭제 버튼 클릭
function deleteMemo(memoId) {
    $.ajax({
        url:"/memo/delete",
        type:"POST",
        dataType:"json",
        data : {
            memoId : memoId
        },
        success:function(result){
            if(result.memoId != 0){
                $('.lecture-memo .memo-list .memo-id:contains("' + memoId + '")').parent().remove();
                $('.list-lecture-item > li .memo-id:contains("' + memoId + '")').parent('li').remove();
            }else{
                alert('메모가 삭제되지 않았습니다.');
            }
        }
    });

};

// 메모 등록 버튼 클릭
function entrustMemo(){
    var classCode = $('#modal-lecture-task').find('.lecture-code:nth-child(2) span').text().replace(/교과목 코드 : /gi, "");
    var timeInfo = $('#modal-lecture-task').find('.lecture-time  span').text();
    var memoTitle = $('#recipient-name').val();
    var memoContent = $('#message-text').val();
    timeInfo = timeInfo.replace(/:00/gi, "").replace(/\|/gi,"")
        .replace(/\(/gi, "").replace(/\)/gi,"").replace(/,/gi,"")
        .replace(/-/gi, "");
    var timeArr = timeInfo.split("  ");
    var startTime = timeArr[0];
    var endTime = timeArr[1];
    var dayOfWeek = timeArr[2];
    console.log(classCode);
    memoTitle = "메모 제목";
    memoContent = "메모 내용 텍스트";

    $.ajax({
        url:"/memo/put",
        type:"POST",
        dataType:"json",
        data : {
            classCode : classCode,
            memoTitle : memoTitle,
            memoContent : memoContent
        },
        success:function(result){
            if(result != null){
                alert("새로운 메모가 작성되었습니다.");
                console.log(result.memoId);
                $.fn.addMemo(result.memoId, result.memoTitle, result.memoContent);
                console.log(result.memoId);
                var str = '';
                str += '<li>';
                str += '<div class="lecture-noti" data-toggle="tooltip" data-placement="top" title="" data-original-title="' + result.memoContent + '">';
                str += '<i class="material-icons ic-lecture-noti">assignment</i>';
                str += '<span class="lecture-noti-title">' + result.memoTitle + '</span>';
                str += '</div>'
                str += '<div class="memo-id" style="display:none">' + result.memoId + '</div>';
                str += '<div class="memo-title-' + (i + 1) + '" style="display:none">' + result.memoTitle + '</div>';
                str += '<div class="memo-content-' + (i + 1) + '" style="display:none">' + result.memoContent + '</div>';
                str += '</li>';
            console.log(result.memoId);
                for(var i = 0 ; i < dayOfWeek.length; i++){
                    if(dayOfWeek.charAt(i) == '월'){
                        var tagLocation = $('.timeline-vertical > .top-info > .day:contains("Mon")').parent().siblings('ul');
                        tagLocation.find('li a .class-code:contains("' + classCode +'")').siblings('ul').append(str);
                    }else if(dayOfWeek.charAt(i) == '화'){
                        var tagLocation = $('.timeline-vertical > .top-info > .day:contains("Tue")').parent().siblings('ul');
                        tagLocation.find('li a .class-code:contains("' + classCode +'")').siblings('ul').append(str);
                    }else if(dayOfWeek.charAt(i) == '수'){
                        var tagLocation = $('.timeline-vertical > .top-info > .day:contains("Wed")').parent().siblings('ul');
                        tagLocation.find('li a .class-code:contains("' + classCode +'")').siblings('ul').append(str);
                    }else if(dayOfWeek.charAt(i) == '목'){
                        var tagLocation = $('.timeline-vertical > .top-info > .day:contains("Thu")').parent().siblings('ul');
                        tagLocation.find('li a .class-code:contains("' + classCode +'")').siblings('ul').append(str);
                    }else if(dayOfWeek.charAt(i) == '금'){
                        var tagLocation = $('.timeline-vertical > .top-info > .day:contains("Fri")').parent().siblings('ul');
                        tagLocation.find('li a .class-code:contains("' + classCode +'")').siblings('ul').append(str);
                    }
                }

                $('[data-toggle="tooltip"]').tooltip();
                $('#PopoverContent').modal('hide');
            }else{
                alert("메모 작성에 실패하였습니다.");
            }
        }
    });

    console.log(    $('.timeline-vertical > .top-info > .day:contains("Mon")').parent().siblings('ul li a .class-code:contains("PG1807-01")').siblings('ul').html());
};

