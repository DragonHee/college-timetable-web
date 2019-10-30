package com.example.demo.model.service;

import com.example.demo.model.vo.LectureAndMemoVO;
import com.example.demo.mybatis.mapper.LectureMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class LectureServiceImpl implements LectureService {
    @Autowired
    private LectureMapper lectureMapper;

    @Override
    public Map<String, Object> selectLectureList() {
        Map<String, Object> map = new HashMap<String, Object>();
        List<LectureAndMemoVO> list = lectureMapper.selectAllLecture();

        List<LectureAndMemoVO> selectedList = new ArrayList<>();
        List<LectureAndMemoVO> unSelectedList = new ArrayList<>();
        System.out.println();
        for(LectureAndMemoVO lamVO : list){
            if(lamVO.isSelectedFlag()) selectedList.add(lamVO);
            else unSelectedList.add(lamVO);
        }

        map.put("selected", selectedList);
        map.put("unselected", unSelectedList);

        return map;
    }
}
