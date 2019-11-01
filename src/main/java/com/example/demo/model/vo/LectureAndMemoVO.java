package com.example.demo.model.vo;

import lombok.*;

import java.util.List;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class LectureAndMemoVO {
    LectureVO lectureVO;
    List<MemoVO> memoList;
}
