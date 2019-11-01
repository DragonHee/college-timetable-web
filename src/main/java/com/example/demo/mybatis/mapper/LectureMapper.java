package com.example.demo.mybatis.mapper;

import com.example.demo.model.vo.LectureAndMemoVO;
import com.example.demo.model.vo.LectureVO;
import com.example.demo.model.vo.SelectedLectureTimeVO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
@Mapper
public interface LectureMapper {
    List<LectureVO> selectAllLecture();
    LectureVO selectLecture(Map<String, Object> map);
    List<SelectedLectureTimeVO> getSelectedLectureTime();
    int entrustLecture(Map<String, Object> map);
    int deleteLecture(Map<String, Object> map);
}
