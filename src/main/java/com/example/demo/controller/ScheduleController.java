package com.example.demo.controller;

import com.example.demo.model.service.LectureService;
import com.example.demo.model.vo.EntrustLectureTimeVO;
import com.example.demo.model.vo.LectureAndMemoVO;
import com.example.demo.model.vo.LectureVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/schedule")
public class ScheduleController {
    @Autowired
    private LectureService lectureService;

    @RequestMapping(value = "/put", method = RequestMethod.POST)
    public LectureAndMemoVO insertSchedule(EntrustLectureTimeVO entrustLectureTimeVO) {
        LectureAndMemoVO lectureAndMemoVO = lectureService.entrustLecture(entrustLectureTimeVO);
        return lectureAndMemoVO;
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public LectureVO deleteSchedule(String classCode) {
        Map<String, Object> map = new HashMap<String, Object>();

        map.put("classCode", classCode);
        return lectureService.deleteLecture(map);
    }
}
