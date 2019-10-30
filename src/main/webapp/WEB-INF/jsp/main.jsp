<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib  prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta charset="utf8">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <script src="js/main.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/material-design-icons/3.0.1/iconfont/material-icons.min.css">
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <title>시간표 작성</title>
</head>
<body>
<div class="container-lecture">
    <section class="header">
        <h3 class="headline">시간표 만들기</h3>
    </section>
    <section class="section-nav">
        <form id="search-form" class="form-search">
            <input type="text" placeholder="강의 검색" class="form-control">
            <span><i class="material-icons ic-search">search</i></span>
        </form>

        <ul class="list-lecture">
            <c:forEach var="unSelectedLecture" items="${lectureList.unselected}">
            <li class="card-lecture" >
                <a class="lecture-title" href="#"><c:out value="${unSelectedLecture.subjectName}" /></a>
                <h6 class="lecture-time">
                    <i class="material-icons ic-lecture-info">access_time</i>
                    <span>
                        <fmt:formatNumber value="${unSelectedLecture.startTime}" pattern="00" />:00 - <fmt:formatNumber value="${unSelectedLecture.endTime}" pattern="00" />:00 |
                        <c:forEach begin="0" end="${fn:length(unSelectedLecture.dayOfWeek) - 1}" varStatus="loop">
                            <c:choose>
                                <c:when test="${loop.index eq fn:length(unSelectedLecture.dayOfWeek) - 1}">
                                    <c:out value="(${fn:substring(unSelectedLecture.dayOfWeek, loop.index, loop.index + 1)})" />
                                </c:when>
                                <c:otherwise>
                                    <c:out value="(${fn:substring(unSelectedLecture.dayOfWeek, loop.index, loop.index + 1)}), " />
                                </c:otherwise>
                            </c:choose>
                        </c:forEach>
                    </span>
                </h6>
                <ul class="list-lecture-info">
                    <li>교과목 코드 : <span><c:out value="${unSelectedLecture.classCode}" /></span></li>
                    <li>담당 교수 : <span><c:out value="${unSelectedLecture.professorName}" /></span></li>
                    <li>강의실 : <span><c:out value="${unSelectedLecture.location}" /></span></li>
                </ul>
            </li>
            </c:forEach>
        </ul>
    </section>

    <section class="section-list">
        <div class="container-xl">
            <div class="table-schedule">
                <div class="timeline">
                    <ul>
                        <li><span>09:00</span></li>
                        <li><span>09:30</span></li>
                        <li><span>10:00</span></li>
                        <li><span>10:30</span></li>
                        <li><span>11:00</span></li>
                        <li><span>11:30</span></li>
                        <li><span>12:00</span></li>
                        <li><span>12:30</span></li>
                        <li><span>13:00</span></li>
                        <li><span>13:30</span></li>
                        <li><span>14:00</span></li>
                        <li><span>14:30</span></li>
                        <li><span>15:00</span></li>
                        <li><span>15:30</span></li>
                        <li><span>16:00</span></li>
                        <li><span>16:30</span></li>
                        <li><span>17:00</span></li>
                        <li><span>17:30</span></li>
                        <li><span>18:00</span></li>
                    </ul>
                </div>

                <div class="table-schedule-subject">
                    <ul class="list-lecture-item">
                        <c:forEach begin="1" end="5" varStatus="loop_day">
                            <li class="timeline-vertical">
                                <div class="top-info today">
                                    <h4 class="day">
                                        <c:choose>
                                            <c:when test="${loop_day.index == 1}">Mon<c:set var="cur_day" value="월"/></c:when>
                                            <c:when test="${loop_day.index == 2}">Tue<c:set var="cur_day" value="화"/></c:when>
                                            <c:when test="${loop_day.index == 3}">Wed<c:set var="cur_day" value="수"/></c:when>
                                            <c:when test="${loop_day.index == 4}">Thu<c:set var="cur_day" value="목"/></c:when>
                                            <c:when test="${loop_day.index == 5}">Fri<c:set var="cur_day" value="금"/></c:when>
                                        </c:choose>
                                    </h4>
                                </div>
                                <ul>
                                    <c:forEach var="selectedLecture" items="${lectureList.selected}" varStatus="loop">
                                        <c:if test="${fn:contains(selectedLecture.dayOfWeek, cur_day)}">
                                           <c:choose>
                                              <c:when test="${selectedLecture.endTime - selectedLecture.startTime == 2}">
                                                <li class="lecture-time two-hr hr-${selectedLecture.startTime}" data-event="lecture-<fmt:formatNumber value="${loop.index + 1}" pattern="00" />">
                                              </c:when>
                                              <c:otherwise>
                                                <li class="lecture-time hr-${selectedLecture.startTime}" data-event="lecture-<fmt:formatNumber value="${loop.index + 1}" pattern="00" />">
                                              </c:otherwise>
                                           </c:choose>
                                            <a href="#">
                                                <div class="class-code" style="display:none">${selectedLecture.classCode}</div>
                                                <div class="professor-name" style="display:none">${selectedLecture.professorName}</div>
                                                <div class="start-time" style="display:none">${selectedLecture.startTime}</div>
                                                <div class="end-time" style="display:none">${selectedLecture.endTime}</div>
                                                <div class="day-of-week" style="display:none">${selectedLecture.dayOfWeek}</div>
                                                <div class="lecture-info">
                                                    <h6 class="lecture-title">
                                                        <c:out value="${selectedLecture.subjectName}" />
                                                    </h6>
                                                    <h6 class="lecture-location">
                                                        <c:out value="${selectedLecture.location}" />
                                                    </h6>
                                                </div>
                                                <c:if test="${not empty selectedLecture.memoTitle}">
                                                    <div class="lecture-noti" data-toggle="tooltip" data-placement="top" title="" data-original-title="${selectedLecture.memoContent}">
                                                        <i class="material-icons ic-lecture-noti">assignment</i>
                                                        <span class="lecture-noti-title">
                                                            <c:out value="${selectedLecture.memoTitle}" />
                                                        </span>
                                                    </div>
                                                </c:if>
                                            </a>
                                        </c:if>
                                     </c:forEach>
                                </ul>
                            </li>
                        </c:forEach>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</div>

<div class="modal fade" id="modal-lecture-info" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <h3 class="lecture-title"></h3>
                <ul class="lecture-info">
                    <li class="lecture-time">
                        <i class="material-icons ic-lecture-info">access_alarm</i>
                        <span></span>
                    </li>
                    <li class="lecture-code">
                        <i class="material-icons ic-lecture-info">code</i>
                        <span></span>
                    </li>
                    <li class="lecture-code">
                        <i class="material-icons ic-lecture-info">school</i>
                        <span></span>
                    </li>
                    <li class="lecture-code">
                        <i class="material-icons ic-lecture-info">business</i>
                        <span></span>
                    </li>
                </ul>
                <div class="lecture-description">
                    <p class="txt-description">본 강의에서는 JSP를 이용한 웹 기반 프로그래밍 기초 및 응용기술에 대해 학습합니다. 특히 실습 위주의 수업으로 프로그래밍 스킬 향상 및
                        실무 능력을 갖출 수 있도록 합니다.
                    </p>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-light" data-dismiss="modal">취소</button>
                <button type="button" class="btn btn-primary">과목 등록하기</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modal-lecture-task" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <h3 class="lecture-title"></h3>
                <ul class="lecture-info">
                    <li class="lecture-time">
                        <i class="material-icons ic-lecture-info">access_alarm</i>
                        <span></span>
                    </li>
                    <li class="lecture-code">
                        <i class="material-icons ic-lecture-info">code</i>
                        <span></span>
                    </li>
                    <li class="lecture-code">
                        <i class="material-icons ic-lecture-info">school</i>
                        <span></span>
                    </li>
                    <li class="lecture-code">
                        <i class="material-icons ic-lecture-info">business</i>
                        <span></span>
                    </li>
                </ul>
                <div class="lecture-description">
                    <p class="txt-description">본 강의에서는 JSP를 이용한 웹 기반 프로그래밍 기초 및 응용기술에 대해 학습합니다. 특히 실습 위주의 수업으로 프로그래밍 스킬 향상 및
                        실무 능력을 갖출 수 있도록 합니다.
                    </p>
                </div>

                <div class="lecture-memo">
                    <h5 class="memo-header">메모</h5>
                    <ul>
                        <li class="memo-list">
                            <div class="memo-content" data-toggle="tooltip" data-placement="top" title="" data-original-title="과제 설명 텍스트 과제 설명 텍스트 과제 설명 텍스트">
                                <i class="material-icons ic-lecture-noti">assignment</i>
                                <span class="lecture-noti-title">과제 제목 텍스트</span>
                            </div>
                            <div class="memo-btn">
                                <a href=""><i class="material-icons ic-lecture-noti">delete</i></a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="modal-footer">
                <div class="left">
                    <button class="btn btn-light-primary" type="button" data-toggle="popover"
                            data-trigger="click" data-placement="right" data-html="true">
                        메모 등록
                    </button>
                </div>
                <div class="right">
                    <button type="button" class="btn btn-light" data-dismiss="modal">확인</button>
                    <button type="button" class="btn btn-danger" >과목 삭제하기</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="PopoverContent" style="display: none;">
    <h5 class="schedule-title">메모 등록하기</h5>
    <div class="form-group">
        <label class="col-form-label">제목
            <input type="text" class="form-control" id="recipient-name" placeholder="제목 추가">
        </label>
    </div>
    <div class="form-group">
        <label for="message-text" class="col-form-label">설명</label>
        <textarea class="form-control" id="message-text" placeholder="설명 추가"></textarea>
    </div>
    <button type="button" class="btn btn-primary btn-save">등록</button>
</div>

</body>
</html>
