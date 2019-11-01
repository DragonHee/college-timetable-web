package com.example.demo.model.service;

import com.example.demo.model.vo.EntrustLectureTimeVO;
import com.example.demo.model.vo.LectureAndMemoVO;
import com.example.demo.model.vo.LectureVO;

import java.util.Map;

public interface LectureService {
    Map<String, Object> selectLectureList();
    LectureAndMemoVO entrustLecture(EntrustLectureTimeVO entrustLectureTimeVO);
    LectureVO deleteLecture(Map<String, Object> map);
}
