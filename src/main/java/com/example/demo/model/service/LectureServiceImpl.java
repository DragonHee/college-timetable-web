package com.example.demo.model.service;

import com.example.demo.model.vo.*;
import com.example.demo.mybatis.mapper.LectureMapper;
import com.example.demo.mybatis.mapper.MemoMapper;
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
    @Autowired
    private MemoMapper memoMapper;

    @Override
    public Map<String, Object> selectLectureList() {
        Map<String, Object> map = new HashMap<String, Object>();
        List<LectureVO> lectureList = lectureMapper.selectAllLecture();
        List<MemoVO> memoList =  memoMapper.selectAllMemo();

        List<LectureAndMemoVO> selectedList = new ArrayList<>();
        List<LectureAndMemoVO> unSelectedList = new ArrayList<>();

        for(LectureVO lectureVO : lectureList){
            List<MemoVO> memoVOList = new ArrayList<>();
            for(MemoVO memoVO : memoList){
                if(memoVO.getClassCode().equals(lectureVO.getClassCode())){
                    memoVOList.add(memoVO);
                }
            }
            LectureAndMemoVO lectureAndMemoVO = new LectureAndMemoVO(lectureVO, memoVOList);
            if(lectureAndMemoVO.getLectureVO().isSelectedFlag()) selectedList.add(lectureAndMemoVO);
            else unSelectedList.add(lectureAndMemoVO);
        }

        map.put("selected", selectedList);
        map.put("unselected", unSelectedList);

        return map;
    }

    @Override
    public LectureAndMemoVO entrustLecture(EntrustLectureTimeVO entrustLectureTimeVO) {
        List<SelectedLectureTimeVO> list = lectureMapper.getSelectedLectureTime();

        for(int i = 0 ; i < entrustLectureTimeVO.getDayOfWeek().length(); i++){
            for(SelectedLectureTimeVO vo : list){
                for(int j = 0 ; j < vo.getDayOfWeek().length(); j++){
                    if(entrustLectureTimeVO.getDayOfWeek().charAt(i) == vo.getDayOfWeek().charAt(j)){
                        System.out.println(entrustLectureTimeVO.getDayOfWeek().charAt(i) + " 와 " + vo.getDayOfWeek().charAt(j) + "를 비교합니다.");
                        if(entrustLectureTimeVO.getStartTime() < vo.getEndTime() && entrustLectureTimeVO.getEndTime() > vo.getStartTime()) {
                            System.out.println("추가 목록 시작시간 : "+ entrustLectureTimeVO.getStartTime() + " / 비교 대상 시작시간 : " + vo.getStartTime());
                            System.out.println("추가 목록 끝나는시간 : "+ entrustLectureTimeVO.getEndTime() + " / 비교 대상 끝나는시간 : " + vo.getEndTime());
                            System.out.println("실패!");
                            return null;
                        }
                    }
                }
            }
        }
        Map<String, Object> map = new HashMap<>();
        map.put("classCode", entrustLectureTimeVO.getClassCode());
        if(lectureMapper.entrustLecture(map) == 0) return null;
        LectureVO lectureVO = lectureMapper.selectLecture(map);
        List<MemoVO> memoList = memoMapper.selectMemo(map);

        LectureAndMemoVO lectureAndMemoVO = new LectureAndMemoVO(lectureVO, memoList);
        return lectureAndMemoVO;
    }

    @Override
    public LectureVO deleteLecture(Map<String, Object> map) {
        LectureVO lectureVO = null;
        if(lectureMapper.deleteLecture(map) > 0) lectureVO = lectureMapper.selectLecture(map);
        return lectureVO;
    }
}
